import { CollapseDirective } from "../App/Directives/Collapse.Directive";
import { LogoutButtonController, LogoutButtonDirective } from "../App/Directives/LogoutButton.Directive";
import { EditRoundController, EditRoundDirective } from "../App/Management/Games/Directives/EditRound.Directive";

export function SetupDirectives(app: angular.IModule): void {
    app.controller("directive.logoutButtonController", ["$scope", "authService", LogoutButtonController]);
    app.controller("directive.editRoundController", ["manageQuestionResource", EditRoundController]);

    app.directive("logoutButton", LogoutButtonDirective.Instance);
    app.directive("collapse", CollapseDirective.Instance);
    app.directive("editRound", EditRoundDirective.Instance);
}
