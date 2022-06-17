export interface IRouter {
    readonly navigateTo: (path: string) => void;
}

export interface RouterNavigateFunction {
    (to: string): void;
}

export class ReactRouterService implements IRouter {
    private readonly navigate: RouterNavigateFunction;

    constructor(navigate: RouterNavigateFunction) {
        this.navigate = navigate;
    }

    public navigateTo(path: string) {
        this.navigate(path);
    }
}
