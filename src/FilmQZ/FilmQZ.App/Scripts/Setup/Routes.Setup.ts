import { AppComponent } from "../App/App.Component";
import { LoginComponent } from "../App/Components/Account/Login.Component";
import { RegisterComponent } from "../App/Components/Account/Register.Component";
import { HomeComponent } from "../App/Components/Home/Home.Component";

export function SetupRoutes($stateProvider: ng.ui.IStateProvider): void {
    $stateProvider.state({
        name: "app",
        url: "/",
        component: AppComponent.NAME,
    });

    $stateProvider.state(
        {
            name: "app.home",
            url: "^/home",
            component: HomeComponent.NAME,
        });

    $stateProvider.state(
        {
            name: "app.register",
            url: "^/account/register",
            component: RegisterComponent.NAME,
        });

    $stateProvider.state(
        {
            name: "app.login",
            url: "^/account/login",
            component: LoginComponent.NAME,
        });
}