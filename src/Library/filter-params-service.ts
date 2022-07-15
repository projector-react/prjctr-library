import { map, merge, Observable, Subject, scan } from 'rxjs';

enum DefaultCategory {
    All = 'All',
    Popular = 'Popular'
}

enum PartnersCategory {
    Reastream = 'Reastream'
}

export type LibraryCategory = DefaultCategory | PartnersCategory;

export enum LibraryDirection {
    All = 'All',
    Graphics = 'Graphics',
    Dev = 'Dev',
    Marketing = 'Marketing',
    Management = 'Management',
    Advertising = 'Advertising'
}

export enum LibraryFormat {
    All = 'All',
    Conference = 'Conference',
    Video = 'Video',
    Tutorial = 'Tutorial',
    Interview = 'Interview'
}

export enum LibraryLevel {
    All = 'All',
    Beginner = 'Beginner',
    Specialist = 'Specialist'
}

export type RequestParams = {
    readonly query: string;
    readonly direction: LibraryDirection;
    readonly format: LibraryFormat;
    readonly level: LibraryLevel;
    readonly category: LibraryCategory;
    readonly limit: number;
    readonly page: number;
};

export interface FilterParamsState {
    readonly state$: Observable<RequestParams>;
}

export interface FilterParamsActions {
    readonly setQuery: (query: string) => void;
    readonly setDirection: (direction: LibraryDirection) => void;
    readonly setFormat: (format: LibraryFormat) => void;
    readonly setLevel: (level: LibraryLevel) => void;
    readonly setCategory: (category: LibraryCategory) => void;
    readonly setPage: (page: number) => void;
    readonly setLimit: (limit: number) => void;
    readonly reset: () => void;
}

export type FilterParamsService = FilterParamsState & FilterParamsActions;

const initialState: RequestParams = {
    query: '',
    direction: LibraryDirection.All,
    format: LibraryFormat.All,
    level: LibraryLevel.All,
    category: DefaultCategory.All,
    limit: 10,
    page: 1
};

const enum Events {
    DidQueryChanged = 'DidQueryChanged',
    DidDirectionChanged = 'DidDirectionChanged',
    DidFormatChanged = 'DidFormatChanged',
    DidLevelChanged = 'DidLevelChanged',
    DidCategoryChanged = 'DidCategoryChanged',
    DidPageChanged = 'DidPageChanged',
    DidLimitChanged = 'DidLimitChanged',
    DidReset = 'DidReset'
}

const actions = {
    didQueryChanged: (query: string) =>
        ({
            type: Events.DidQueryChanged,
            payload: query
        } as const),
    didDirectionChanged: (direction: LibraryDirection) =>
        ({
            type: Events.DidDirectionChanged,
            payload: direction
        } as const),
    didFormatChanged: (format: LibraryFormat) =>
        ({
            type: Events.DidFormatChanged,
            payload: format
        } as const),
    didLevelChanged: (level: LibraryLevel) =>
        ({
            type: Events.DidLevelChanged,
            payload: level
        } as const),
    didCategoryChanged: (category: LibraryCategory) =>
        ({
            type: Events.DidCategoryChanged,
            payload: category
        } as const),
    didPageChanged: (page: number) =>
        ({
            type: Events.DidPageChanged,
            payload: page
        } as const),
    didLimitChanged: (limit: number) =>
        ({
            type: Events.DidLimitChanged,
            payload: limit
        } as const),
    didReset: () =>
        ({
            type: Events.DidReset
        } as const)
};

export function createFilterParamsService(): FilterParamsService {
    const onQuery$ = new Subject<string>();
    const onDirection$ = new Subject<LibraryDirection>();
    const onFormat$ = new Subject<LibraryFormat>();
    const onLevel$ = new Subject<LibraryLevel>();
    const onCategory$ = new Subject<LibraryCategory>();
    const onPage$ = new Subject<number>();
    const onLimit$ = new Subject<number>();
    const onReset$ = new Subject<void>();

    const state$ = merge(
        onQuery$.pipe(map(actions.didQueryChanged)),
        onDirection$.pipe(map(actions.didDirectionChanged)),
        onFormat$.pipe(map(actions.didFormatChanged)),
        onLevel$.pipe(map(actions.didLevelChanged)),
        onCategory$.pipe(map(actions.didCategoryChanged)),
        onPage$.pipe(map(actions.didPageChanged)),
        onLimit$.pipe(map(actions.didLimitChanged)),
        onReset$.pipe(map(actions.didReset))
    ).pipe(
        scan((state, event) => {
            switch (event.type) {
                case Events.DidQueryChanged: {
                    return {
                        ...state,
                        query: event.payload
                    };
                }
                case Events.DidDirectionChanged: {
                    return {
                        ...state,
                        direction: event.payload
                    };
                }
                case Events.DidFormatChanged: {
                    return {
                        ...state,
                        format: event.payload
                    };
                }
                case Events.DidLevelChanged: {
                    return {
                        ...state,
                        level: event.payload
                    };
                }
                case Events.DidCategoryChanged: {
                    return {
                        ...state,
                        category: event.payload
                    };
                }
                case Events.DidPageChanged: {
                    return {
                        ...state,
                        page: event.payload
                    };
                }
                case Events.DidLimitChanged: {
                    return {
                        ...state,
                        limit: event.payload
                    };
                }
                case Events.DidReset: {
                    return initialState;
                }
                default: {
                    return state;
                }
            }
        }, initialState)
    );

    return {
        state$,
        setQuery: query => onQuery$.next(query),
        setDirection: (direction: LibraryDirection) => onDirection$.next(direction),
        setFormat: (format: LibraryFormat) => onFormat$.next(format),
        setLevel: (level: LibraryLevel) => onLevel$.next(level),
        setCategory: (category: LibraryCategory) => onCategory$.next(category),
        setPage: (page: number) => onPage$.next(page),
        setLimit: (limit: number) => onLimit$.next(limit),
        reset: () => onReset$.next()
    };
}
