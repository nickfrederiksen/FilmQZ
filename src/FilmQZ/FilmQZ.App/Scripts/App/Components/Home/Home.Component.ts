﻿import { Component } from "../../Abstracts/Component";
import { ManageTeamResources } from "../../Resources/Manage.Team.Resources";

class HomeController implements ng.IController {

    public teams = new TeamsModel();

    constructor(private manageTeamResources: ManageTeamResources) { // DevSkim: ignore DS137138
        this.loadTeams();
    }

    private loadTeams() {
        this.manageTeamResources.GetAll()
            .then((resp) => {
                this.teams.OwnTeams = resp.data.filter((i) => i.IsOwner);
                this.teams.SubscribedTeams = resp.data.filter((i) => i.IsOwner === false);
            });
    }
}

class TeamsModel {
    public OwnTeams: ns.Management.Team.ITeamListItemModel[] = [];
    public SubscribedTeams: ns.Management.Team.ITeamListItemModel[] = [];
}

export class HomeComponent extends Component {
    public controller = ["manageTeamResources", HomeController];
    public templateUrl = require("../../Views/Home.Component.html");

    constructor(app: angular.IModule) {
        super("homeView", app);
    }

    public Route(): ns.ISortedRoute {
        return {
            component: this.name,
            name: "app.home",
            sortOrder: 1,
            url: "^/home",
        };
    }
}
