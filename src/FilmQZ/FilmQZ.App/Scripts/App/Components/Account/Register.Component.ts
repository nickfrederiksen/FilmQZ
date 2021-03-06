﻿import { Component } from "../../Abstracts/Component";
import { AuthService, INewUserModel } from "../../Services/Auth.Service";
class RegisterController implements ng.IController {
    public savedSuccessfully: boolean = false;
    public message: string = "";

    public registration: INewUserModel = {
        ConfirmPassword: "",
        Email: "",
        Password: ""
    };

    constructor(private $state: ng.ui.IStateService,
                private $timeout: ng.ITimeoutService,
                private authService: AuthService) {
    }

    public signUp(): void {
        this.authService.saveRegistration(this.registration)
            .then(() => {

                this.savedSuccessfully = true;
                this.message =
                    "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                this.startTimer();

            },
                (response) => {
                    const errors: string[] = [];
                    for (const key in response.data.ModelState) {
                        if (response.data.ModelState.hasOwnProperty(key)) {
                            const element = response.data.ModelState[key];
                            for (const item of element) {
                                errors.push(item);
                            }
                        }
                    }

                    this.message = "Failed to register user due to:" + errors.join(" ");
                });

    }

    private startTimer(): void {
        const timer: ng.IPromise<any> = this.$timeout(() => {
            this.$timeout.cancel(timer);
            this.$state.transitionTo("app.login");
        }, 2000);

    }
}

export class RegisterComponent extends Component {
    public controller = ["$state", "$timeout", "authService", RegisterController];
    public templateUrl = require("../../Views/Account/register.html");

    constructor(app: angular.IModule) {
        super("registerView", app);
    }

    public Route(): ns.ISortedRoute {
        return {
            component: this.name,
            name: "app.register",
            sortOrder: 4,
            url: "^/account/register"
        };
    }
}
