import { ManageTeamResources } from "../../Resources/Manage.Team.Resources";

class CreateTeamController implements ng.IController {

    public model: ns.Management.Team.ICreateTeamModel = { Name: "" };

    public errorMessage: string | undefined;

    constructor(
        private $state: ng.ui.IStateService,
        private teamResources: ManageTeamResources) { // DevSkim: ignore DS137138
    }

    public createTeam = () => {
        this.errorMessage = undefined;
        this.teamResources.Create(this.model)
            .then((response) => {

                this.$state.transitionTo("manage.editTeam", { id: response.data.Id });
            }, (err) => {
                this.errorMessage = err.statusText;
            });
    }
}

export class CreateTeamComponent implements ng.IComponentOptions {

    public static NAME: string = "createTeamView";

    public controller = ["$state", "teamResources", CreateTeamController];

    public templateUrl = require("../../Views/Manage/Teams/CreateTeam.html");
}
