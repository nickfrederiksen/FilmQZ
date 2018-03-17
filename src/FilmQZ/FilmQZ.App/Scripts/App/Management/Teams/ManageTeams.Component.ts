import { TeamFilter } from "../../Enums/TeamFilter";
import { ManageTeamResources } from "../../Resources/Manage.Team.Resources";

class ManageTeamsController implements ng.IController {
    public myTeams: ns.Management.Team.ITeamListItemModel[] = [];
    public myMemberships: ns.Management.Team.ITeamListItemModel[] = [];

    constructor(private teamResources: ManageTeamResources) { // DevSkim: ignore DS137138
        this.loadTeams();
    }

    public DeleteTeam = (teamId: string) => {
        this.teamResources.Delete(teamId)
            .then(() => {
                this.loadTeams();
            });
    }

    public UnSubscribe = (teamId: string) => {
        this.teamResources.UnSubscribe(teamId)
            .then(() => {
                this.loadMembershipTeams();
            });
    }

    private loadTeams() {
        this.loadOwnTeams();

        this.loadMembershipTeams();
    }

    private loadMembershipTeams() {
        this.teamResources.Get(TeamFilter.Membership).then((teamResult) => {
            this.myMemberships = teamResult.data;
        });
    }

    private loadOwnTeams() {
        this.teamResources.Get(TeamFilter.Owner).then((teamResult) => {
            this.myTeams = teamResult.data;
        });
    }
}

export class ManageTeamsComponent implements ng.IComponentOptions {

    public static NAME: string = "manageTeamsView";

    public controller = ["teamResources", ManageTeamsController];

    public templateUrl = require("../../Views/Manage/Teams/ManageTeams.html");
}
