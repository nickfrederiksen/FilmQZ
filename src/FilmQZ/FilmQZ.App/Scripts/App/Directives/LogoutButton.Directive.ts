import { AuthService } from "../Services/Auth.Service";

export class LogoutButtonDirective implements angular.IDirective {

    public static Instance() {
        return new LogoutButtonDirective();
    }

    public scope = {};
    public templateUrl = require("./Views/LogoutButton.html");
    public controller = "directive.logoutButtonController";
    public controllerAs = "ctrl";
}
export class LogoutButtonController {
    public isAuthorized = this.authService.authentication.isAuth;

    constructor($scope: ng.IScope, private authService: AuthService) {
        $scope.$watch(() => this.authService.authentication.isAuth, (newValue) => {
            this.isAuthorized = newValue;
        });
    }

    public logout() {
        this.authService.logOut();
    }
}
