import { createContext, FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouterContextType, RouterProviderType } from './types';
import { ReactRouterService } from './RouterService';

export const RouterContext = createContext<RouterContextType>({
    navigate: () => undefined
});

export const RouterProvider: FC<RouterProviderType> = ({ children }) => {
    const navigator = useNavigate();

    const providerMemoValue = useMemo(() => {
        const routerService = new ReactRouterService(navigator);

        return {
            navigate: (path: string) => routerService.navigate(path)
        };
    }, [navigator]);

    return <RouterContext.Provider value={providerMemoValue}>{children}</RouterContext.Provider>;
};
