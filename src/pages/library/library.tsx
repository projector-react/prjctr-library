import { LibraryView, LibraryViewProps } from './libraryView';
import { diInject } from '../../HOC/Incjector';
import { AuthService } from '../../Auth/auth-service';

export type Credentials = {
    readonly username: string;
    readonly password: string;
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
