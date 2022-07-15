import { diInject } from '../HOC/Incjector';

import { AuthView, AuthViewProps } from './AuthView';

type AuthService = {
    refreshToken: () => void;
};

export const createAuthState = (authService: AuthService): Pick<AuthViewProps, 'refreshToken'> => ({
    refreshToken: authService.refreshToken
});

export const Auth = diInject(AuthView, 'authState');
