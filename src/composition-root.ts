import { createFilterParamsService } from './Library/filter-params-service';
import { createFilterResultService } from './Library/filter-result-service';
import { createFilterService } from './Library/filter-service';
import { createAuthService } from './Auth/auth-service';
import { createAxiosHTTPService } from './api/api-service';

const filterParams = createFilterParamsService();
const filterResult = createFilterResultService();
const apiService = createAxiosHTTPService();
const authService = createAuthService(apiService);
const filterService = createFilterService(filterParams, filterResult, apiService);

export const container = {
    filterParams,
    filterResult,
    apiService,
    authService,
    filterService
};
