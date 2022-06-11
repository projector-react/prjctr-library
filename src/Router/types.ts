import { ReactNode } from 'react';

export interface RouterNavigateFunction {
    (to: string): void;
}

export interface IRouter {
    navigate: (path: string) => void;
}

export enum RouteName {
    LOGIN = '/login',
    REGISTRATION = '/register',
    LIBRARY = '/',
    VIDEO = '/video'
}

export type RouterContextType = {
    readonly navigate: (path: string) => void;
};

export type RouterProviderType = {
    children: ReactNode;
};
