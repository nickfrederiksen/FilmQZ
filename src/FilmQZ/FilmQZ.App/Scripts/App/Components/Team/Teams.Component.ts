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

export class TeamsComponent implements ng.IComponentOptions {

    public static NAME: string = "teamsView";

    public controller = ["teamResources", TeamsController];

    public templateUrl = require("../../Views/Teams.Component.html");
}
