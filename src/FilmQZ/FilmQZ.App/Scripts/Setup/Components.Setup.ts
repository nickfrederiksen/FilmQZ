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

export function SetupComponents(app: angular.IModule): void {
    app.component(AppComponent.NAME, new AppComponent());
    app.component(HomeComponent.NAME, new HomeComponent());
    app.component(RegisterComponent.NAME, new RegisterComponent());
    app.component(LoginComponent.NAME, new LoginComponent());

    app.component(ManageComponent.NAME, new ManageComponent());
    app.component(ManageGamesComponent.NAME, new ManageGamesComponent());
    app.component(EditGameComponent.NAME, new EditGameComponent());
    app.component(CreateGameComponent.NAME, new CreateGameComponent());
    app.component(ManageTeamsComponent.NAME, new ManageTeamsComponent());
    app.component(CreateTeamComponent.NAME, new CreateTeamComponent());
    app.component(EditTeamComponent.NAME, new EditTeamComponent());
}
