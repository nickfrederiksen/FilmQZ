class HomeController implements ng.IController {

    public welcome: string = "hello ng";

    constructor(private $http: ng.IHttpService) { // DevSkim: ignore DS137138

        console.log("Hello world...");

    }

    public test(): void {

        this.$http.post<string>("/api/management/game", { name: "test" })

            .then((resp) => {

                console.log(resp);

            }, (resp) => {

                console.log(resp);

            });

    }

}

export class HomeComponent implements ng.IComponentOptions {

    public static NAME: string = "homeView";

    public controller = ["$http", HomeController];

    public templateUrl = require("./home.html");
}
