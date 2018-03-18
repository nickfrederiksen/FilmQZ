import { Component } from "../../Abstracts/Component";
import { TeamResources } from "../../Resources/Team.Resources";

class TeamController implements ng.IController {

    public team: ns.Teams.ITeamProfileModel | undefined;

    private readonly teamUrl: any;

    constructor($stateParams: ng.ui.IStateParamsService,
                private teamResources: TeamResources) { // DevSkim: ignore DS137138

        this.teamUrl = $stateParams.id;
        this.loadTeam();
    }

    private loadTeam() {
        this.teamResources.GetSingle(this.teamUrl)
            .then((resp) => {
                this.team = resp.data;
            });
    }
}

export class TeamComponent extends Component {

    public controller = ["$stateParams", "teamResources", TeamController];

    public templateUrl = require("../../Views/Team.Component.html");

    constructor(app: angular.IModule) {
        super("teamView", app);
    }
    public Route(): ns.ISortedRoute {
        return {
            component: this.name,
            name: "app.team",
            sortOrder: 3,
            url: "^/teams/{id}",
        };
    }
}
