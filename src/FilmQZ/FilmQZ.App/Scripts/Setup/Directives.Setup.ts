import { CollapseDirective } from "../App/Directives/Collapse.Directive";
import { LogoutButtonController, LogoutButtonDirective } from "../App/Directives/LogoutButton.Directive";

export function SetupDirectives(app: angular.IModule): void {
    app.controller("directive.logoutButtonController", ["$scope", "authService", LogoutButtonController]);

    app.directive("logoutButton", LogoutButtonDirective.Instance);
    app.directive("collapse", CollapseDirective.Instance);
}
