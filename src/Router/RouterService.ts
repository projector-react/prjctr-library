export interface IRouter {
    readonly navigate: (path: string) => void;
}

export interface RouterNavigateFunction {
    (to: string): void;
}

export class ReactRouterService implements IRouter {
    private readonly navigator: RouterNavigateFunction;

    constructor(navigator: RouterNavigateFunction) {
        this.navigator = navigator;
    }

    public navigate(path: string) {
        this.navigator(path);
    }
}
