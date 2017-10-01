// app.ts
import { module, element, bootstrap } from "angular";
import { AppComponent } from "./App/App.Component";
import { HomeComponent } from "./App/Home/Home.Component";
// import { HomeComponent } from "../app/home/home.component";
// import { UserService } from "../app/services/user.services";

module AppModule {
    export function Configure($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider): void {
        $stateProvider.state({
            name: "app",
            url: "",
            component: AppComponent.NAME
        }).state(
            {
                name: "app.home",
                url: "",
                component: HomeComponent.NAME
            });

        $urlRouterProvider.otherwise("");
    }
}

export let app: angular.IModule = module("app", [
    "ui.router"
]).config(AppModule.Configure)
    .component(AppComponent.NAME, new AppComponent())
    .component(HomeComponent.NAME, new HomeComponent());


element(document).ready(() => {
    bootstrap(document, ["app"]);
});