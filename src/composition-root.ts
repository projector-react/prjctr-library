import { createFilterParamsService } from './Library/filter-params-service';
import { createFilterResultService } from './Library/filter-result-service';
import { createFilterService } from './Library/filter-service';
import { createAuthService } from './Auth/auth-service';
import { createAxiosHTTPService } from './api/api-service';
import { createLibraryState } from './pages/library/library';
import { asFunction, createContainer, InjectionMode } from 'awilix';
import { createAuthState } from './Auth/Auth';

const container = createContainer({
    injectionMode: InjectionMode.CLASSIC
});

container.register({
    filterParams: asFunction(createFilterParamsService),
    filterResult: asFunction(createFilterResultService),
    apiService: asFunction(createAxiosHTTPService),
    authService: asFunction(createAuthService),
    filterService: asFunction(createFilterService),
    libraryState: asFunction(createLibraryState),
    authState: asFunction(createAuthState)
});

export default container;
