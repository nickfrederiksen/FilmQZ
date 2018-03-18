import { ManageTeamResources } from "../../Resources/Manage.Team.Resources";

class EditTeamController implements ng.IController {

    public model: ns.Management.Team.IUpdateTeamModel = { Name: "" };

    public teamMembers: ns.Management.Team.ITeamMemberModel[] = [];

    public errorMessage: string | undefined;

    private readonly teamId: any;

    constructor($stateParams: ng.ui.IStateParamsService,
                private manageTeamResources: ManageTeamResources) {

        this.teamId = $stateParams.id;
        this.loadTeam();
    }

    public updateTeam = () => {
        this.manageTeamResources.Update(this.teamId, this.model)
            .then(() => {
                this.loadTeam();
            }, (err) => {
                this.errorMessage = err.statusText;
            });
    }

    public kickUser = (userId: string) => {
        this.manageTeamResources.KickUser(this.teamId, userId)
            .then(() => {
                this.loadTeam();
            });
    }

    private loadTeam() {
        this.manageTeamResources.GetSingle(this.teamId)
            .then((resp) => {
                this.model = resp.data;
            });

        this.manageTeamResources.GetMembers(this.teamId)
            .then((resp) => {
                this.teamMembers = resp.data;
            });
    }
}

export class EditTeamComponent implements ng.IComponentOptions {

    public static NAME: string = "editTeamView";

    public controller = ["$stateParams", "manageTeamResources", EditTeamController];

    public templateUrl = require("../../Views/Manage/Teams/EditTeam.html");
}
