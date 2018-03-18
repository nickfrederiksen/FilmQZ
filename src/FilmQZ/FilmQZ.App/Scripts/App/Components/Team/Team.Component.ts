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

export class TeamComponent implements ng.IComponentOptions {

    public static NAME: string = "teamView";

    public controller = ["$stateParams", "teamResources", TeamController];

    public templateUrl = require("../../Views/Team.Component.html");
}
