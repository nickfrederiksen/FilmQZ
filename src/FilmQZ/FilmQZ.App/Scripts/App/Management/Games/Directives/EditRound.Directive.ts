import { ManageQuestionResources } from "../../../Resources/Manage.Question.Resources";

export class EditRoundDirective implements angular.IDirective {

    public static Instance() {
        return new EditRoundDirective();
    }
    public scope: true;
    public bindToController = {
        onRoundDelete: "&",
        model: "=",
        form: "="
    };

    public templateUrl = require("./Views/EditRound.html");
    public controller = "directive.editRoundController";
    public controllerAs = "$ctrl";
}

export class EditRoundController {

    public HasLoadedQuestions = false;
    public onRoundDelete: (round: ns.Management.Round.IEditiableRoundListItem) => void;
    public model: ns.Management.Round.IEditiableRoundListItem;
    public form: ng.IFormController;
    // tslint:disable-next-line:no-empty
    constructor(private manageQuestionResource: ManageQuestionResources) {
    }

    public delete(round: ns.Management.Round.IEditiableRoundListItem) {
        if (confirm("Are you sure you want to remove this round?")) {
            round.isDeleted = true;
            this.form.$setDirty();
        }
    }

    public loadQuestions() {
        if (this.HasLoadedQuestions === false) {

            this.manageQuestionResource.GetAll(this.model.GameId, this.model.Id)
                .then((response) => {
                    this.HasLoadedQuestions = true;
                    console.log(response.data);
                });
        }
    }
}
