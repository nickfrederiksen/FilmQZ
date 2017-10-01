class HomeController implements ng.IController {
    public welcome: string = "hello ng";
    constructor() {
        console.log("Hello world...");
    }
}

export class HomeComponent implements ng.IComponentOptions {
    static NAME: string = "homeView";
    controller = HomeController;
    templateUrl = require("./home.html");
}