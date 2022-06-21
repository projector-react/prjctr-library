import { createContext, FC, ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactRouterService } from './router-service';

export enum RouteName {
    LOGIN = 'LOGIN',
    REGISTRATION = 'REGISTRATION',
    LIBRARY = 'LIBRARY',
    VIDEO = 'VIDEO'
}

export type RouterContextType = {
    readonly navigate: (path: string) => void;
    readonly getPath: (route: RouteName) => string;
};

export type RouterProviderType = {
    children: ReactNode;
};

function getRoutePath(route: RouteName): string {
    switch (route) {
        case RouteName.LOGIN:
            return '/login';
        case RouteName.REGISTRATION:
            return '/register';
        case RouteName.LIBRARY:
            return '/';
        case RouteName.VIDEO:
            return '/video';
        default:
            return '/not-found';
    }
}

export const RouterContext = createContext<RouterContextType>({
    navigate: () => undefined,
    getPath: (route: RouteName) => getRoutePath(route)
});

export const RouterProvider: FC<RouterProviderType> = ({ children }) => {
    const navigator = useNavigate();

    const providerMemoValue = useMemo<RouterContextType>(() => {
        const routerService = new ReactRouterService(navigator);

        return {
            navigate: (path: string) => routerService.navigateTo(path),
            getPath: (route: RouteName) => getRoutePath(route)
        };
    }, [navigator]);

    return <RouterContext.Provider value={providerMemoValue}>{children}</RouterContext.Provider>;
};
