import { TransitionService } from "@uirouter/angularjs";
import { StateObject } from "@uirouter/core";
import { Component } from "../../Abstracts/Component";
class ManageController implements ng.IController {

    public year = new Date().getFullYear();
    public topNavigation: ns.ITopNavigationItem[] = [];

    private currentState: StateObject | ng.ui.IState | undefined;

    constructor(public $state: ng.ui.IStateService, $transitions: TransitionService) {

        this.buildTopNavigation();

        this.updateTopNavigationState();
        $transitions.onFinish({}, (transition) => {
            this.currentState = transition.$to();
            this.updateTopNavigationState();
        });
    }

    private updateTopNavigationState(): void {
        this.topNavigation.forEach((item) => {
            if (this.currentState != null) {
                item.isActive = item.sref === this.currentState.name;
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
            anonymousOnly: false,
            authorizedOnly: false,
            isActive: false,
            isVisible: true,
            sref: "manage",
            text: "Manage"
        });

        this.topNavigation.push({
            anonymousOnly: false,
            authorizedOnly: false,
            isActive: false,
            isVisible: true,
            sref: "manage.manageGames",
            text: "Games"
        });

        this.topNavigation.push({
            anonymousOnly: false,
            authorizedOnly: false,
            isActive: false,
            isVisible: true,
            sref: "manage.manageTeams",
            text: "Teams"
        });
    }
}

export class ManageComponent extends Component {
    public controller = ["$state", "$transitions", ManageController];
    public templateUrl = require("../../Views/Manage.Component.html");

    constructor(app: angular.IModule) {
        super("manageView", app);
    }

    public Route(): ns.ISortedRoute {
        return {
            component: this.name,
            name: "manage",
            sortOrder: 100,
            url: "/manage",
        };
    }
}
