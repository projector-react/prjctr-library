import { IRouter, RouterNavigateFunction } from './types';

export class ReactRouterService implements IRouter {
    private readonly navigator: RouterNavigateFunction;

    constructor(navigator: RouterNavigateFunction) {
        this.navigator = navigator;
    }

    public navigate(path: string) {
        this.navigator(path);
    }
}
