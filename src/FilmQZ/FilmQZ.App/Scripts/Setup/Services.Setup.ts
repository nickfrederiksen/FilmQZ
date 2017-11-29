import { AuthService } from "../App/Services/Auth.Service";
import { AuthInterceptorService } from "../App/Services/AuthInterceptor.Service";

export function SetupServices(app: angular.IModule): void {

    app.service("authService", ["$http", "$q", "localStorageService", AuthService]);
    app.service("authInterceptorService", ["$q", "$state", "localStorageService", AuthInterceptorService]);
}
