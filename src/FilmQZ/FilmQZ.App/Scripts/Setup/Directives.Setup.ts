// tslint:disable-next-line:max-line-length
import { EditQuestionController, EditQuestionDirective } from "../App/Components/Management/Games/Directives/EditQuestion.Directive";
// tslint:disable-next-line:max-line-length
import { EditRoundController, EditRoundDirective } from "../App/Components/Management/Games/Directives/EditRound.Directive";
import { CollapseDirective } from "../App/Directives/Collapse.Directive";
import { LogoutButtonController, LogoutButtonDirective } from "../App/Directives/LogoutButton.Directive";
import { MarkdownEditorController, MarkdownEditorDirective } from "../App/Directives/MarkdownEditor.Directive";

export function SetupDirectives(app: angular.IModule): void {
    app.controller("directive.logoutButtonController", ["$scope", "authService", LogoutButtonController]);
    app.controller("directive.editRoundController", ["$scope", "manageQuestionResources", EditRoundController]);
    app.controller("directive.editQuestionController", [EditQuestionController]);
    app.controller("directive.MarkdownEditorController", ["$scope", "$sce", MarkdownEditorController]);

    app.directive("logoutButton", LogoutButtonDirective.Instance);
    app.directive("collapse", CollapseDirective.Instance);
    app.directive("editRound", EditRoundDirective.Instance);
    app.directive("editQuestion", EditQuestionDirective.Instance);
    app.directive("markdownEditor", MarkdownEditorDirective.Instance);
}
