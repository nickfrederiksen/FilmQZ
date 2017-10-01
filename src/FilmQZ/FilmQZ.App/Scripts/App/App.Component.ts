import { TransitionService, StateObject } from "@uirouter/angularjs";
class AppController implements ng.IController {
    public year = new Date().getFullYear();
    public topNavigation: ITopNavigationItem[] = [];

    constructor(public $state: ng.ui.IStateService,
        $transitions: TransitionService) {

        this.buildTopNavigation();

        this.updateTopNavigation($state.current);
        $transitions.onFinish({}, (transition) => {
            this.updateTopNavigation(transition.$to());
        });

        $state.transitionTo("app.home");
    }

    private updateTopNavigation(currentState: StateObject | ng.ui.IState): void {
        this.topNavigation.forEach(item => {
            item.isActive = item.sref === currentState.name;
        });
    }

    private buildTopNavigation(): void {
        this.topNavigation = [];
        this.topNavigation.push({
            isActive: false,
            sref: "app.home",
            text: "home"
        });
    }
}

interface ITopNavigationItem {
    isActive: boolean;
    sref: string;
    text: string;
}

export class AppComponent implements ng.IComponentOptions {
    static NAME: string = "appView";
    controller = AppController;
    templateUrl = require("./app.component.html");
}