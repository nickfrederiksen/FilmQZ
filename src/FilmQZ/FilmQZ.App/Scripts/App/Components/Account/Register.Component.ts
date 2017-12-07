import { AuthService, INewUserModel } from "../../Services/Auth.Service";
class RegisterController implements ng.IController {
    public savedSuccessfully: boolean = false;
    public message: string = "";

    public registration: INewUserModel = {
        Email: "",
        Password: "",
        ConfirmPassword: ""
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
                for (const element of response.data.modelState) {

                    for (const item of element) {
                        errors.push(item);
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

export class RegisterComponent implements ng.IComponentOptions {
    public static NAME: string = "registerView";
    public controller = ["$state", "$timeout", "authService", RegisterController];
    public templateUrl = require("./register.html");
}
