import axios from 'axios';
import { HttpService, RequestConfig } from '../http/http-service';

export const API_URL = 'http://localhost:8000/api';

export type APIService = HttpService;

export function createAxiosHTTPService(): APIService {
    const initialConfig: RequestConfig = {
        method: 'get'
    };
    const $api = axios.create({
        withCredentials: true,
        baseURL: API_URL
    });

    $api.interceptors.response.use(
        config => config,
        async error => {
            const originalRequest = error.config;

            if (error.response.status === 401 && error.config && !error.config.isRetry) {
                originalRequest.isRetry = true;
                try {
                    await axios.post(`${API_URL}/auth/refresh`, {
                        withCredentials: true
                    });
                    return $api.request(originalRequest);
                } catch {
                    throw Error('Not authorized!');
                }
            }

            throw error;
        }
    );

    async function request<T, C>(url: string, requestParams: C, config = initialConfig) {
        const result = await $api.request<T>({
            url,
            data: requestParams,
            ...config
        });

        return result.data;
    }

    return {
        request
    };
}
