export type RequestConfig = {
    readonly method?: string;
};

export interface HttpService {
    readonly request: <T, C>(url: string, requestParams?: C, config?: RequestConfig) => Promise<T>;
}
