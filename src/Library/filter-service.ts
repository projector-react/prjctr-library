import { FilterParamsService, RequestParams } from './filter-params-service';
import { FilterResult, FilterResultService } from './filter-result-service';
import { switchMap } from 'rxjs';
import { APIService } from '../api/api-service';

export type FilterService = void;

export function createFilterService(
    filterParamsService: FilterParamsService,
    filterResultService: FilterResultService,
    apiService: APIService
): FilterService {
    filterParamsService.state$
        .pipe(
            switchMap(requestParams =>
                apiService.request<FilterResult, RequestParams>('/api/videos', requestParams, {
                    method: 'post'
                })
            )
        )
        .subscribe(result => {
            filterResultService.setResult(result);
        });
}
