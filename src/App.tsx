import { FC } from 'react';
import { AppRouter } from './components/AppRouter/AppRouter';
import { AuthProvider } from './Auth/AuthContext';

export const App: FC = () => (
    <AuthProvider>
        <AppRouter />
    </AuthProvider>
);
