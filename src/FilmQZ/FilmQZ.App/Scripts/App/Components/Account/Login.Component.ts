﻿import { AuthService, ILoginInfo } from "../../Services/Auth.Service";
class LoginController implements ng.IController {
    public loginData: ILoginInfo = {
        Email: "",
        Password: ""
    };
    public message: string = "";

    constructor(private $state: ng.ui.IStateService, private authService: AuthService) {
    }

    public login(): void {
        this.authService.login(this.loginData).then(() => {

            this.$state.transitionTo("app.home");

        },
            (err) => {
                this.message = err.error_description;
            });
    }
}

export class LoginComponent implements ng.IComponentOptions {
    public static NAME: string = "loginView";
    public controller = LoginController;
    public templateUrl = require("./login.html");
}
