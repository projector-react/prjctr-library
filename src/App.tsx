import { FC } from 'react';
import { AppRouter } from './components/AppRouter/AppRouter';
import { AuthProvider } from './Auth/AuthContext';
import { DIContainerProvider } from './context/DIContainerContext';

export const App: FC = () => (
    <DIContainerProvider>
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    </DIContainerProvider>
);
