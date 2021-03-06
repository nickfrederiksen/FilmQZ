﻿import { StateObject, TransitionService } from "@uirouter/angularjs";
import { Component } from "./Abstracts/Component";
import { AuthService } from "./Services/Auth.Service";
class AppController implements ng.IController {

    public year = new Date().getFullYear();
    public topNavigation: ns.ITopNavigationItem[] = [];

    private currentState: StateObject | ng.ui.IState | undefined;

    constructor($scope: ng.IScope,
                private authService: AuthService,
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
            anonymousOnly: false,
            authorizedOnly: false,
            isActive: false,
            isVisible: true,
            sref: "app.home",
            text: "Home"
        });
        this.topNavigation.push({
            anonymousOnly: true,
            authorizedOnly: false,
            isActive: false,
            isVisible: this.authService.authentication.isAuth === false,
            sref: "app.register",
            text: "Register"
        });
        this.topNavigation.push({
            anonymousOnly: true,
            authorizedOnly: false,
            isActive: false,
            isVisible: this.authService.authentication.isAuth === false,
            sref: "app.login",
            text: "Login"
        });

        this.topNavigation.push({
            anonymousOnly: false,
            authorizedOnly: true,
            isActive: false,
            isVisible: this.authService.authentication.isAuth === true,
            sref: "app.teams",
            text: "Teams"
        });
        this.topNavigation.push({
            anonymousOnly: false,
            authorizedOnly: true,
            isActive: false,
            isVisible: this.authService.authentication.isAuth === true,
            sref: "manage",
            text: "Manage"
        });

        this.topNavigation.push({
            anonymousOnly: false,
            authorizedOnly: true,
            isActive: false,
            isVisible: this.authService.authentication.isAuth === true,
            sref: "app.editProfile",
            text: "Profile"
        });
    }
}

export class AppComponent extends Component {
    public controller = ["$scope", "authService", "$transitions", AppController];
    public templateUrl = require("./Views/app.component.html");

    constructor(app: angular.IModule) {
        super( "appView", app);
    }
    public Route(): ns.ISortedRoute {
        return {
            component: this.name,
            name: "app",
            sortOrder: 0,
            url: "/"
        };
    }
}
