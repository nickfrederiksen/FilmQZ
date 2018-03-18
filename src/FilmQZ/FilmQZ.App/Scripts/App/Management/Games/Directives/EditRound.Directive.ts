import { QuestionType } from "../../../Enums/QuestionTypes";
import { ManageQuestionResources } from "../../../Resources/Manage.Question.Resources";

export class EditRoundDirective implements angular.IDirective {

    public static Instance() {
        return new EditRoundDirective();
    }
    public scope = true;
    public bindToController = {
        form: "=",
        model: "=",
        onRoundDelete: "&"
    };

    public templateUrl = require("../../../Views/Manage/Games/Directives/EditRound.html");
    public controller = "directive.editRoundController";
    public controllerAs = "$ctrl";
}

export class EditRoundController {

    public onRoundDelete!: (round: ns.Management.Round.IEditiableRoundListItem) => void;
    public model!: ns.Management.Round.IEditiableRoundListItem;
    public form!: ng.IFormController;

    // tslint:disable-next-line:no-empty
    constructor($scope: ng.IScope, private manageQuestionResources: ManageQuestionResources) {
        $scope.$watch(() => this.model, () => {
            this.loadQuestions();
        });
    }

    public addQuestion() {
        if (this.model.questions == null) {
            this.model.questions = [];
        }
        const newQuestionModel: ns.Management.Question.IEditiableQuestionListItem = {
            CreatedDate: new Date(),
            Id: "new-question-" + new Date().valueOf(),
            Point: 0,
            QuestionType: QuestionType.TextField,
            Text: "",
            isNew: true
        };

        this.model.questions.push(newQuestionModel);

        this.form.$setDirty();
    }

    public delete(round: ns.Management.Round.IEditiableRoundListItem) {
        if (confirm("Are you sure you want to remove this round?")) {
            round.isDeleted = true;
            this.form.$setDirty();
        }
    }

    public loadQuestions() {
        if (this.model.isNew !== true) {

            this.manageQuestionResources.GetAll(this.model.GameId, this.model.Id)
                .then((response) => {
                    this.model.questions = response.data;
                });
        }
    }
}
