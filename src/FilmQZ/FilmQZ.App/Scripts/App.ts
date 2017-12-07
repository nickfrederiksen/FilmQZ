// app.ts
import "@uirouter/angularjs";
import { bootstrap, element, module } from "angular";
import "angular-local-storage";
import { AuthService } from "./App/Services/Auth.Service";

import { SetupComponents } from "./Setup/Components.Setup";
import { SetupDirectives } from "./Setup/Directives.Setup";
import { SetupResources } from "./Setup/Resource.Setup";
import { SetupRoutes } from "./Setup/Routes.Setup";
import { SetupServices } from "./Setup/Services.Setup";

function Configure($stateProvider: ng.ui.IStateProvider,
                   $urlRouterProvider: ng.ui.IUrlRouterProvider,
                   $httpProvider: ng.IHttpProvider,
                   localStorageServiceProvider: angular.local.storage.ILocalStorageServiceProvider,
): void {

    SetupRoutes($stateProvider);

    $urlRouterProvider.otherwise("/home");
    localStorageServiceProvider.setPrefix("FilmQZ");

    $httpProvider.interceptors.push("authInterceptorService");
}

export let app: angular.IModule = module("app", [
    "ui.router", "LocalStorageModule",
]);

app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", "localStorageServiceProvider", Configure]);

SetupServices(app);
SetupResources(app);
SetupDirectives(app);
SetupComponents(app);

app.run(["authService", (authService: AuthService) => {
    authService.fillAuthData();
}]);

element(document).ready(() => {
    bootstrap(document, ["app"]);
});
