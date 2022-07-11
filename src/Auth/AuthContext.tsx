import { createContext, FC, ReactNode, useContext, useEffect, useMemo } from 'react';
import { useObservableState } from 'observable-hooks';
import { LoginRequestParams, RegisterRequestParams } from './auth-service';
import { useDIContainer } from '../context/DIContainerContext';

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

export const AuthProvider: FC<AuthProviderType> = ({ children }) => {
    const { authService } = useDIContainer();
    const { isAuthenticated$, register, login, logout, refreshToken } = authService;
    const isAuth = useObservableState(isAuthenticated$, false);

    useEffect(() => {
        refreshToken();
    }, []);

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
