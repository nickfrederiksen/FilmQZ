import { ManageTeamResources } from "../../Resources/Manage.Team.Resources";

class ManageTeamsController implements ng.IController {
    public teams: ns.Management.Team.ITeamListItemModel[] = [];

    constructor(private teamResources: ManageTeamResources) { // DevSkim: ignore DS137138
        this.loadTeams();
    }

    private loadTeams() {
        this.teamResources.GetMine().then((teamResult) => {
            this.teams = teamResult.data;
        });
    }
}

export class ManageTeamsComponent implements ng.IComponentOptions {

    public static NAME: string = "manageTeamsView";

    public controller = ["teamResources", ManageTeamsController];

    public templateUrl = require("./ManageTeams.html");
}
