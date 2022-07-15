import { Observable, Subject, scan, merge, map } from 'rxjs';
import { LibraryCategory } from './filter-params-service';

export type Author = {
    readonly name: string;
    readonly link?: string;
    readonly position: string;
};

enum VideoSize {
    Default = 'Default',
    Featured = 'Featured'
}

export interface Video {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly mainCategory?: LibraryCategory;
    readonly categories: LibraryCategory[];
    readonly publishDate?: string;
    readonly authors: Author[];
    readonly thumbnail: string;
    readonly source?: string;
    readonly isFavorite: boolean;
    readonly isPrivate: boolean;
    readonly videoSize: VideoSize;
}

export type FilterResult = {
    list: Video[];
};

const initialState: FilterResult = {
    list: [] as Video[]
};

type FilterResultState = {
    readonly result$: Observable<FilterResult>;
};

type FilterResultActions = {
    readonly setResult: (result: FilterResult) => void;
};

export type FilterResultService = FilterResultState & FilterResultActions;

enum Event {
    DidSetResult = 'DidSetResult'
}

const actions = {
    didSetResult: (list: FilterResult) =>
        ({
            type: Event.DidSetResult,
            payload: list
        } as const)
};

export function createFilterResultService(): FilterResultService {
    const onSetResult$ = new Subject<FilterResult>();

    const result$ = merge(onSetResult$.pipe(map(actions.didSetResult))).pipe(
        scan((state, event) => {
            switch (event.type) {
                case Event.DidSetResult: {
                    return {
                        ...state,
                        ...event.payload
                    };
                }
                default: {
                    return state;
                }
            }
        }, initialState)
    );

    return {
        result$,
        setResult: result => onSetResult$.next(result)
    };
}
