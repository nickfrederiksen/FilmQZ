import { Component } from "../../Abstracts/Component";
import { AuthService, ILoginInfo } from "../../Services/Auth.Service";
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
                console.log(err);
                this.message = err.error_description;
            });
    }
}

export class LoginComponent extends Component {
    public controller = ["$state", "authService", LoginController];
    public templateUrl = require("../../Views/Account/login.html");

    constructor(app: angular.IModule) {
        super("loginView", app);
    }

    public Route(): ns.ISortedRoute {
        return {
            component: this.name,
            name: "app.login",
            sortOrder: 5,
            url: "^/account/login",
        };
    }
}
