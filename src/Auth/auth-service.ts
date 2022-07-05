import { map, merge, Observable, ReplaySubject, scan, Subject, switchMap } from 'rxjs';
import { APIService } from '../api/api-service';

export type AuthCredentials = {
    readonly username: string;
    readonly password: string;
};

export type RegisterRequestParams = AuthCredentials;
export type RegisterResponse = AuthCredentials;
export type LoginRequestParams = AuthCredentials;
export type LogoutResponse = {
    readonly msg: string;
};

export type Tokens = {
    access_token: string;
    refresh_token: string;
};

export type AuthService = {
    readonly isLoading$: Observable<boolean>;
    readonly isAuthenticated$: Observable<boolean>;
    readonly register: (requestParams: RegisterRequestParams) => void;
    readonly login: (requestParams: LoginRequestParams) => void;
    readonly logout: () => void;
};

type State = {
    isAuthenticated: boolean;
    isLoading: boolean;
    isSuccess: boolean | undefined;
};

const initialState: State = {
    isAuthenticated: false,
    isLoading: false,
    isSuccess: undefined
};

const enum Events {
    DidRegisterCompleted = 'DidRegisterCompleted',
    DidLoginCompleted = 'DidLoginCompleted',
    DidLogoutCompleted = 'DidLogoutCompleted',
    DidRefreshCompleted = 'DidRefreshCompleted',
    DidRegisterStarted = 'DidRegisterStarted'
}

const actions = {
    didRegisterCompleted: (authCredentials: AuthCredentials) =>
        ({
            type: Events.DidRegisterCompleted,
            payload: {
                authCredentials
            }
        } as const),

    didLoginCompleted: (tokens: Tokens) =>
        ({
            type: Events.DidLoginCompleted,
            payload: {
                tokens
            }
        } as const),

    didRefreshCompleted: (tokens: Tokens) =>
        ({
            type: Events.DidRefreshCompleted,
            payload: {
                tokens
            }
        } as const),

    didLogoutCompleted: (response: LogoutResponse) =>
        ({
            type: Events.DidLogoutCompleted,
            payload: {
                response
            }
        } as const),

    didRegisterStarted: () =>
        ({
            type: Events.DidRegisterStarted
        } as const)
};

export function createAuthService(apiService: APIService): AuthService {
    const onRegister$ = new Subject<RegisterRequestParams>();
    const onLogin$ = new Subject<LoginRequestParams>();
    const onLogout$ = new Subject<void>();
    const onRefreshToken$ = new ReplaySubject<void>(1);

    const registerResult$ = onRegister$.pipe(
        switchMap(async requestParams => {
            const result = await apiService.request<RegisterResponse, RegisterRequestParams>(
                '/auth/register',
                requestParams,
                {
                    method: 'post'
                }
            );

            if (!result) {
                throw Error('User already exist');
            }

            return result;
        })
    );

    const loginResult$ = onLogin$.pipe(
        switchMap(requestParams =>
            apiService.request<Tokens, LoginRequestParams>('/auth/login', requestParams, {
                method: 'post'
            })
        )
    );

    const logoutResult$ = onLogout$.pipe(
        switchMap(() =>
            apiService.request<LogoutResponse, undefined>('/auth/logout', undefined, {
                method: 'post'
            })
        )
    );

    const refreshResult$ = onRefreshToken$.pipe(
        switchMap(async () => {
            try {
                const response = await apiService.request<Tokens, undefined>(
                    '/auth/refresh',
                    undefined,
                    {
                        method: 'post'
                    }
                );

                return response;
            } catch {
                return {} as Tokens;
            }
        })
    );

    const state$ = merge(
        registerResult$.pipe(map(actions.didRegisterCompleted)),
        loginResult$.pipe(map(actions.didLoginCompleted)),
        refreshResult$.pipe(map(actions.didRefreshCompleted)),
        logoutResult$.pipe(map(actions.didLogoutCompleted)),

        onRegister$.pipe(map(actions.didRegisterStarted))
    ).pipe(
        scan((state, event) => {
            switch (event.type) {
                case Events.DidRegisterStarted: {
                    return {
                        ...state,
                        isLoading: true
                    };
                }

                case Events.DidRegisterCompleted: {
                    return {
                        ...state,
                        isLoading: false,
                        isAuthenticated: true
                    };
                }

                case Events.DidLoginCompleted: {
                    const { tokens } = event.payload;

                    return {
                        ...state,
                        isAuthenticated: !!tokens.access_token
                    };
                }

                case Events.DidRefreshCompleted: {
                    const { tokens } = event.payload;

                    return {
                        ...state,
                        isAuthenticated: !!tokens?.access_token
                    };
                }

                case Events.DidLogoutCompleted: {
                    const { response } = event.payload;

                    return {
                        ...state,
                        isAuthenticated: !response.msg
                    };
                }
                default:
                    return state;
            }
        }, initialState)
    );

    onRefreshToken$.next();

    return {
        isLoading$: state$.pipe(map(({ isLoading }) => isLoading)),
        isAuthenticated$: state$.pipe(map(({ isAuthenticated }) => isAuthenticated)),
        register: params => onRegister$.next(params),
        login: creds => onLogin$.next(creds),
        logout: () => onLogout$.next()
    };
}
