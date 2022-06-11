export type Author = {
    readonly name: string;
    readonly link?: string;
    readonly position: string;
};

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

export type VideoСompilation = {
    readonly title: string;
    readonly link: string;
    readonly list: Video[];
};

export type RequestParams = {
    readonly query: string;
    readonly direction: LibraryDirection;
    readonly format: LibraryFormat;
    readonly level: LibraryLevel;
    readonly category: LibraryCategory;
};

export type SearchService = {
    readonly updateQuery: (query: string) => void;
    readonly updateDirection: (direction: LibraryDirection) => void;
    readonly updateFormat: (format: LibraryFormat) => void;
    readonly updateLevel: (level: LibraryLevel) => void;
    readonly updateCategory: (category: LibraryCategory) => void;
};

export type LibraryService = {
    readonly getVideoСompilations: (requestParams: RequestParams) => Promise<VideoСompilation[]>;
};
