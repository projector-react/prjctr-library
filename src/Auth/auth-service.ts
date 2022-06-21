import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';
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
    readonly isAuthenticated: () => Observable<boolean>;
    readonly register: (requestParams: RegisterRequestParams) => Promise<RegisterResponse>;
    readonly login: (requestParams: LoginRequestParams) => Promise<Tokens>;
    readonly logout: () => Promise<LogoutResponse>;
};

export function createAuthService(apiService: APIService): AuthService {
    const isAuthorized$ = new BehaviorSubject<boolean>(false);

    async function register(requestParams: RegisterRequestParams) {
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
    }

    async function login(requestParams: LoginRequestParams) {
        const response = await apiService.request<Tokens, LoginRequestParams>(
            'auth/login',
            requestParams,
            {
                method: 'post'
            }
        );

        if (response.access_token) {
            isAuthorized$.next(true);
        }

        return response;
    }

    async function logout() {
        const result = await apiService.request<LogoutResponse, undefined>(
            '/auth/logout',
            undefined,
            {
                method: 'post'
            }
        );

        if (result.msg) {
            isAuthorized$.next(false);
        }

        return result;
    }

    async function refreshToken(): Promise<Pick<Tokens, 'access_token'>> {
        return apiService.request<Pick<Tokens, 'access_token'>, undefined>(
            '/auth/refresh',
            undefined,
            {
                method: 'post'
            }
        );
    }

    function isAuthenticated(): Observable<boolean> {
        return isAuthorized$.asObservable().pipe(distinctUntilChanged());
    }

    function init() {
        refreshToken()
            .then(({ access_token: accessToken }) => {
                if (accessToken) {
                    isAuthorized$.next(true);
                } else {
                    isAuthorized$.next(false);
                }
            })
            .catch(() => {
                isAuthorized$.next(false);
            });
    }

    init();

    return {
        isAuthenticated,
        register,
        login,
        logout
    };
}
