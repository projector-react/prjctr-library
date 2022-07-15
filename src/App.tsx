import { FC } from 'react';
import { AppRouter } from './components/AppRouter/AppRouter';
import { DIContainerProvider } from './context/DIContainerContext';
import { Auth } from './Auth/Auth';

export const App: FC = () => (
    <DIContainerProvider>
        <Auth>
            <AppRouter />
        </Auth>
    </DIContainerProvider>
);
