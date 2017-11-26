﻿import { AppComponent } from "../App/App.Component";
import { LoginComponent } from "../App/Components/Account/Login.Component";
import { RegisterComponent } from "../App/Components/Account/Register.Component";
import { HomeComponent } from "../App/Components/Home/Home.Component";
import { ManageComponent } from "../App/Management/Manage.Component";
import { ManageGameComponent } from "../App/Management/Games/ManageGame.Component";
import { ManageGamesComponent } from "../App/Management/Games/ManageGames.Component";

export function SetupComponents(app: angular.IModule): void {
    app.component(AppComponent.NAME, new AppComponent());
    app.component(HomeComponent.NAME, new HomeComponent());
    app.component(RegisterComponent.NAME, new RegisterComponent());
    app.component(LoginComponent.NAME, new LoginComponent());

    app.component(ManageComponent.NAME, new ManageComponent());
    app.component(ManageGamesComponent.NAME, new ManageGamesComponent())
    app.component(ManageGameComponent.NAME, new ManageGameComponent());
}
