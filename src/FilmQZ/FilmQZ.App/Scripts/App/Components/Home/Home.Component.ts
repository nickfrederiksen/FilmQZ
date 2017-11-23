class HomeController implements ng.IController {

    public welcome: string = "hello ng";

    constructor(private $http: ng.IHttpService) {

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

    public controller = HomeController;

    public templateUrl = require("./home.html");

}
