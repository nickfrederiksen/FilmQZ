import { AppComponent } from "../App/App.Component";
import { LoginComponent } from "../App/Components/Account/Login.Component";
import { RegisterComponent } from "../App/Components/Account/Register.Component";
import { HomeComponent } from "../App/Components/Home/Home.Component";
import { ManageComponent } from "../App/Management/Manage.Component";
import { ManageGameComponent } from "../App/Management/Games/ManageGame.Component";
import { ManageGamesComponent } from "../App/Management/Games/ManageGames.Component";

export function SetupRoutes($stateProvider: ng.ui.IStateProvider): void {
    $stateProvider.state({
        name: "app",
        url: "/",
        component: AppComponent.NAME,
    });

    $stateProvider.state({
        name: "app.home",
        url: "^/home",
        component: HomeComponent.NAME,
    });

    $stateProvider.state({
        name: "app.register",
        url: "^/account/register",
        component: RegisterComponent.NAME,
    });

    $stateProvider.state({
        name: "app.login",
        url: "^/account/login",
        component: LoginComponent.NAME,
    });

    $stateProvider.state({
        name: "manage",
        url: "/manage",
        component: ManageComponent.NAME,
    });

    $stateProvider.state({
        name: "manage.manageGames",
        url: "^/manage/games",
        component: ManageGamesComponent.NAME,
    });

    $stateProvider.state({
        name: "manage.manageGame",
        url: "^/manage/games/{id}",
        component: ManageGameComponent.NAME,
    });
}
