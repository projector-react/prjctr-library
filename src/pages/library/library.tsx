import { LibraryView, LibraryViewProps } from './libraryView';
import { diInject } from '../../HOC/Incjector';
import { Observable } from 'rxjs';

export type Credentials = {
    readonly username: string;
    readonly password: string;
};

type AuthService = {
    readonly isAuthenticated$: Observable<boolean>;
    readonly login: (requestParams: Credentials) => boolean;
    readonly logout: () => void;
    readonly refreshToken: () => void;
};

export function createLibraryState(authService: AuthService): LibraryViewProps {
    authService.refreshToken();
    return {
        isAuthenticated$: authService.isAuthenticated$,
        onLogin: authService.login,
        onLogout: authService.logout
    };
}

export const Library = diInject(LibraryView, 'libraryState');
