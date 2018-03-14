import { AppComponent } from "../App/App.Component";
import { LoginComponent } from "../App/Components/Account/Login.Component";
import { RegisterComponent } from "../App/Components/Account/Register.Component";
import { HomeComponent } from "../App/Components/Home/Home.Component";
import { CreateGameComponent } from "../App/Management/Games/CreateGame.Component";
import { EditGameComponent } from "../App/Management/Games/EditGame.Component";
import { ManageGamesComponent } from "../App/Management/Games/ManageGames.Component";
import { ManageComponent } from "../App/Management/Manage.Component";
import { CreateTeamComponent } from "../App/Management/Teams/CreateTeam.Component";
import { EditTeamComponent } from "../App/Management/Teams/EditTeam.Component";
import { ManageTeamsComponent } from "../App/Management/Teams/ManageTeams.Component";

export function SetupRoutes($stateProvider: ng.ui.IStateProvider): void {
    $stateProvider.state({
        component: AppComponent.NAME,
        name: "app",
        url: "/",
    });

    $stateProvider.state({
        component: HomeComponent.NAME,
        name: "app.home",
        url: "^/home",
    });

    $stateProvider.state({
        component: RegisterComponent.NAME,
        name: "app.register",
        url: "^/account/register",
    });

    $stateProvider.state({
        component: LoginComponent.NAME,
        name: "app.login",
        url: "^/account/login",
    });

    $stateProvider.state({
        component: ManageComponent.NAME,
        name: "manage",
        url: "/manage",
    });

    $stateProvider.state({
        component: ManageGamesComponent.NAME,
        name: "manage.manageGames",
        url: "^/manage/games",
    });

    $stateProvider.state({
        component: CreateGameComponent.NAME,
        name: "manage.createGame",
        url: "^/manage/games/create",
    });

    $stateProvider.state({
        component: EditGameComponent.NAME,
        name: "manage.editGame",
        url: "^/manage/games/{id}",
    });

    $stateProvider.state({
        component: ManageTeamsComponent.NAME,
        name: "manage.manageTeams",
        url: "^/manage/teams",
    });

    $stateProvider.state({
        component: CreateTeamComponent.NAME,
        name: "manage.createTeam",
        url: "^/manage/teams/create",
    });

    $stateProvider.state({
        component: EditTeamComponent.NAME,
        name: "manage.editTeam",
        url: "^/manage/teams/{id}",
    });
}
