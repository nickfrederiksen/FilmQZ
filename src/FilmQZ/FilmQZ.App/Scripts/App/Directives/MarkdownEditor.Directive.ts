import marked = require("marked");

export class MarkdownEditorDirective implements angular.IDirective {

    public static Instance() {
        return new MarkdownEditorDirective();
    }

    public restrict = "A";
    public replace = true;

    public bindToController = {
        model: "=",
        name: "@"
    };

    public templateUrl = require("./Views/markdownEditor.html");
    public controller = "directive.MarkdownEditorController";
    public controllerAs = "ctrl";
}

export class MarkdownEditorController implements ng.IController {
    public model: string | undefined | null;
    public name: string | undefined | null;
    public renderedHtml: string | undefined | null;

    constructor($scope: ng.IScope, $sce: ng.ISCEService) {
        console.log($scope, this);

        $scope.$watch(() => this.model, (value) => {
            if (value == null) {
                value = "";
            }
            const renderedHtml = marked(value);
            this.renderedHtml = $sce.trustAsHtml(renderedHtml);
        });
    }
}
