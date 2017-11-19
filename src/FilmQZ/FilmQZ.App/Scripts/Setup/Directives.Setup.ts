import { LogoutButtonDirective } from "../App/Components/Account/Directives/LogoutButton.Directive";

export function SetupDirectives(app: angular.IModule): void {
    app.directive("logoutButton", LogoutButtonDirective.Instance);
}
