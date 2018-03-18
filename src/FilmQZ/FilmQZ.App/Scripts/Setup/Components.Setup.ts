import { Component } from "../App/Abstracts/Component";
import { AppComponent } from "../App/App.Component";
import { EditProfileComponent } from "../App/Components/Account/EditProfile.Component";
import { LoginComponent } from "../App/Components/Account/Login.Component";
import { RegisterComponent } from "../App/Components/Account/Register.Component";
import { HomeComponent } from "../App/Components/Home/Home.Component";
import { CreateGameComponent } from "../App/Components/Management/Games/CreateGame.Component";
import { EditGameComponent } from "../App/Components/Management/Games/EditGame.Component";
import { ManageGamesComponent } from "../App/Components/Management/Games/ManageGames.Component";
import { ManageComponent } from "../App/Components/Management/Manage.Component";
import { CreateTeamComponent } from "../App/Components/Management/Teams/CreateTeam.Component";
import { EditTeamComponent } from "../App/Components/Management/Teams/EditTeam.Component";
import { ManageTeamsComponent } from "../App/Components/Management/Teams/ManageTeams.Component";
import { TeamComponent } from "../App/Components/Team/Team.Component";
import { TeamsComponent } from "../App/Components/Team/Teams.Component";

export const components: Component[] = [];

export function SetupComponents(app: angular.IModule): void {
    components.push(new AppComponent(app));

    components.push(new HomeComponent(app));
    components.push(new RegisterComponent(app));
    components.push(new LoginComponent(app));
    components.push(new TeamsComponent(app));
    components.push(new TeamComponent(app));

    components.push(new ManageComponent(app));
    components.push(new ManageGamesComponent(app));
    components.push(new EditGameComponent(app));
    components.push(new CreateGameComponent(app));
    components.push(new ManageTeamsComponent(app));
    components.push(new CreateTeamComponent(app));
    components.push(new EditTeamComponent(app));
    components.push(new EditProfileComponent(app));
}
