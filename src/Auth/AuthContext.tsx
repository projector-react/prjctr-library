import { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { useObservableState } from 'observable-hooks';
import { createAuthService, LoginRequestParams, RegisterRequestParams } from './auth-service';
import { createAxiosHTTPService } from '../api/api-service';

type AuthActions = {
    readonly register: (requestParams: RegisterRequestParams) => void;
    readonly login: (requestParams: LoginRequestParams) => void;
    readonly logout: () => void;
};

export type AuthState = {
    isAuthenticated: boolean;
    actions: AuthActions;
};

const authInitialState: AuthState = {
    isAuthenticated: false,
    actions: {} as AuthActions
};

export type AuthProviderType = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthState>(authInitialState);

const { isAuthenticated$, register, login, logout, init } = createAuthService(
    createAxiosHTTPService()
);

export const AuthProvider: FC<AuthProviderType> = ({ children }) => {
    const isAuth = useObservableState(isAuthenticated$, false);

    init();

    const authState = useMemo(
        () => ({
            isAuthenticated: isAuth,
            actions: {
                register,
                login,
                logout
            }
        }),
        [isAuth]
    );

    return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export const useAuthState = () => useContext(AuthContext);
