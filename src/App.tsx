import { FC } from 'react';
import { AppRouter } from './components/AppRouter/AppRouter';
import { DIContainerProvider } from './context/DIContainerContext';

export const App: FC = () => (
    <DIContainerProvider>
        <AppRouter />
    </DIContainerProvider>
);
