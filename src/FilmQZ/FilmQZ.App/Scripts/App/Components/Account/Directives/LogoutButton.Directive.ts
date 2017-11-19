import { AuthService } from "../../../Services/Auth.Service";

export class LogoutButtonDirective implements angular.IDirective {

    public static Instance() {
        return new LogoutButtonDirective();
    }

    public scope = {};
    public templateUrl = require("./LogoutButton.html");
    public controller = LogoutButtonController;
    public controllerAs = "ctrl";
}
class LogoutButtonController {
    public isAuthorized = this.authService.authentication.isAuth;
    constructor($scope: ng.IScope, private $state: ng.ui.IStateService, private authService: AuthService) {
        $scope.$watch(() => this.authService.authentication.isAuth, (newValue) => {
            this.isAuthorized = newValue;
        });
    }

    public logout() {
        this.authService.logOut()
            .then(() => {
                this.$state.transitionTo("app.home");
            });
    }
}
