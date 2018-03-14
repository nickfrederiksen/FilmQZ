import { ManageTeamResources } from "../../Resources/Manage.Team.Resources";

class EditTeamController implements ng.IController {

    public model: ns.Management.Team.IUpdateTeamModel = { Name: "" };

    public teamMembers: ns.Management.Team.ITeamMemberModel[] = [];

    public errorMessage: string | undefined;

    constructor(private $stateParams: ng.ui.IStateParamsService,
                private teamResources: ManageTeamResources) {

        this.loadTeam();
    }

    public updateTeam = () => {
        const teamId = this.$stateParams.id;

        this.teamResources.Update(teamId, this.model)
            .then(() => {
                this.loadTeam();
            }, (err) => {
                this.errorMessage = err.statusText;
            });
    }

    private loadTeam() {
        const teamId = this.$stateParams.id;

        this.teamResources.GetSingle(teamId)
            .then((resp) => {
                this.model = resp.data;
            });

        this.teamResources.GetMembers(teamId)
            .then((resp) => {
                this.teamMembers = resp.data;
            });
    }
}

export class EditTeamComponent implements ng.IComponentOptions {

    public static NAME: string = "editTeamView";

    public controller = ["$stateParams", "teamResources", EditTeamController];

    public templateUrl = require("./EditTeam.html");
}
