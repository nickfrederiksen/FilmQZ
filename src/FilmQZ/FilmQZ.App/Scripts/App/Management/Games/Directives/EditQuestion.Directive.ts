import { QuestionType } from "../../../Enums/QuestionTypes";

export class EditQuestionDirective implements angular.IDirective {

    public static Instance() {
        return new EditQuestionDirective();
    }
    public scope = true;
    public bindToController = {
        form: "=",
        model: "=",
        onDelete: "&"
    };

    public templateUrl = require("./Views/EditQuestion.html");
    public controller = "directive.editQuestionController";
    public controllerAs = "$ctrl";
}

export class EditQuestionController {

    public HasLoadedQuestions = false;
    public onDelete!: (round: ns.Management.Question.IEditiableQuestionListItem) => void;
    public model!: ns.Management.Question.IEditiableQuestionListItem;
    public form!: ng.IFormController;

    public questionTypes = QuestionType;

    public delete(round: ns.Management.Question.IEditiableQuestionListItem) {
        if (confirm("Are you sure you want to remove this round?")) {
            round.isDeleted = true;
            this.form.$setDirty();
        }
    }
}
