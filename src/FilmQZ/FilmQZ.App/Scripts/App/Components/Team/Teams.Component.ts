import { Component } from "../../Abstracts/Component";
import { TeamResources } from "../../Resources/Team.Resources";

class TeamsController implements ng.IController {

    public teams: ns.Teams.ITeamItem[] = [];

    constructor(private teamResources: TeamResources) { // DevSkim: ignore DS137138
        this.loadTeams();
    }

    private loadTeams() {
        this.teamResources.GetAll()
            .then((resp) => {
                this.teams = resp.data;
            });
    }
}

export class TeamsComponent extends Component {
    public controller = ["teamResources", TeamsController];

    public templateUrl = require("../../Views/Teams.Component.html");

    constructor(app: angular.IModule) {
        super("teamsView", app);
    }

    public Route(): ns.ISortedRoute {
        return {
            component: this.name,
            name: "app.teams",
            sortOrder: 2,
            url: "^/teams",
        };
    }
}
