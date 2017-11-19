import "angular-local-storage";
import { IAuthenticationInfo } from "./Auth.Service";

export class AuthInterceptorService {
    constructor(
        private $q: ng.IQService,
        private $state: ng.ui.IStateService,
        private localStorageService: angular.local.storage.ILocalStorageService) {
    }

    public request = (config: ng.IRequestConfig): ng.IRequestConfig => {
        config.headers = config.headers || {};

        if (config.url.match(/^\/api/)) {

            const authData: IAuthenticationInfo = this.localStorageService.get("authorizationData");
            if (authData) {
                config.headers.Authorization = "Bearer " + authData.token;
            }
        }

        return config;
    }

    public responseError = (rejection: ng.IHttpResponse<any>): ng.IPromise<never> => {
        if (rejection.status === 401) {
            this.$state.transitionTo("app.login");
        }
        return this.$q.reject(rejection);

    }

}
