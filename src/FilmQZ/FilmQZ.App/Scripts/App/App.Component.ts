import { StateObject, TransitionService } from "@uirouter/angularjs";
import { AuthService } from "./Services/Auth.Service";
class AppController implements ng.IController {
    // testing

    public year = new Date().getFullYear();
    public topNavigation: ITopNavigationItem[] = [];

    private currentState: StateObject | ng.ui.IState | undefined;

    constructor($scope: ng.IScope, private authService: AuthService, public $state: ng.ui.IStateService,
        $transitions: TransitionService) {

        this.buildTopNavigation();

        this.updateTopNavigationState();
        $transitions.onFinish({}, (transition) => {
            this.currentState = transition.$to();
            this.updateTopNavigationState();
        });

        $scope.$watch(() => this.authService.authentication.isAuth, () => {
            this.updateTopNavigationState();
        });
        // $state.transitionTo("app.home");
    }

    private updateTopNavigationState(): void {
        this.topNavigation.forEach((item) => {
            if (this.currentState != null) {
                item.isActive = item.sref === this.currentState.name;
            }

            item.isVisible = false;

            if (this.authService.authentication.isAuth === true) {
                if (item.anonymousOnly === false) {
                    item.isVisible = true;
                }
            } else {
                if (item.authorizedOnly === false) {
                    item.isVisible = true;
                }
            }
        });
    }

    private buildTopNavigation(): void {
        this.topNavigation = [];
        this.topNavigation.push({
            isActive: false,
            sref: "app.home",
            text: "Home",
            anonymousOnly: false,
            authorizedOnly: false,
            isVisible: true
        });
        this.topNavigation.push({
            isActive: false,
            sref: "app.register",
            text: "Register",
            anonymousOnly: true,
            authorizedOnly: false,
            isVisible: this.authService.authentication.isAuth === false
        });
        this.topNavigation.push({
            isActive: false,
            sref: "app.login",
            text: "Login",
            anonymousOnly: true,
            authorizedOnly: false,
            isVisible: this.authService.authentication.isAuth === false
        });
    }
}

interface ITopNavigationItem {
    isActive: boolean;
    sref: string;
    text: string;
    isVisible: boolean;
    anonymousOnly: boolean;
    authorizedOnly: boolean;
}

export class AppComponent implements ng.IComponentOptions {
    public static NAME: string = "appView";
    public controller = AppController;
    public templateUrl = require("./app.component.html");
}
