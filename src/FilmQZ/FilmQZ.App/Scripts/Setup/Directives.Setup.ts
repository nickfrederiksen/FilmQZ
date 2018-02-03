import { CollapseDirective } from "../App/Directives/Collapse.Directive";
import { LogoutButtonController, LogoutButtonDirective } from "../App/Directives/LogoutButton.Directive";
import { EditQuestionController, EditQuestionDirective } from "../App/Management/Games/Directives/EditQuestion.Directive";
import { EditRoundController, EditRoundDirective } from "../App/Management/Games/Directives/EditRound.Directive";

export function SetupDirectives(app: angular.IModule): void {
    app.controller("directive.logoutButtonController", ["$scope", "authService", LogoutButtonController]);
    app.controller("directive.editRoundController", ["$scope", "questionResources", EditRoundController]);
    app.controller("directive.editQuestionController", [EditQuestionController]);

    app.directive("logoutButton", LogoutButtonDirective.Instance);
    app.directive("collapse", CollapseDirective.Instance);
    app.directive("editRound", EditRoundDirective.Instance);
    app.directive("editQuestion", EditQuestionDirective.Instance);
}
