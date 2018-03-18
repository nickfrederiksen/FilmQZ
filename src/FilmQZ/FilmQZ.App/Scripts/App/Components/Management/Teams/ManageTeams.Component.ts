import { Component } from "../../../Abstracts/Component";
import { ManageTeamResources } from "../../../Resources/Manage.Team.Resources";
import { TeamResources } from "../../../Resources/Team.Resources";

class ManageTeamsController implements ng.IController {
    public myTeams: ns.Management.Team.ITeamListItemModel[] = [];
    public myMemberships: ns.Management.Team.ITeamListItemModel[] = [];

    constructor(private manageTeamResources: ManageTeamResources,
                private teamResources: TeamResources) { // DevSkim: ignore DS137138
        this.loadTeams();
    }

    public DeleteTeam = (teamId: string) => {
        this.manageTeamResources.Delete(teamId)
            .then(() => {
                this.loadTeams();
            });
    }

    public Unsubscribe = (teamUrl: string) => {
        this.teamResources.Unsubscribe(teamUrl)
            .then(() => {
                this.loadTeams();
            });
    }

    private loadTeams() {
        this.manageTeamResources.GetAll().then((teamResult) => {
            this.myTeams = teamResult.data.filter((i) => i.IsOwner);
            this.myMemberships = teamResult.data.filter((i) => i.IsOwner === false);
        });
    }
}

export class ManageTeamsComponent extends Component {
    public controller = ["manageTeamResources", ManageTeamsController];

    public templateUrl = require("../../../Views/Manage/Teams/ManageTeams.html");

    constructor(app: angular.IModule) {
        super("manageTeamsView", app);
    }

    public Route(): ns.ISortedRoute {
        return {
            component: this.name,
            name: "manage.manageTeams",
            sortOrder: 104,
            url: "^/manage/teams",
        };
    }
}
