import { ManageGameResources } from "../../Resources/Manage.Game.Resources";

class EditGameController implements ng.IController {

    public welcome: string = "hello ng";

    constructor(private $stateParams: ng.ui.IStateParamsService, private gameResources: ManageGameResources) {

        console.log(this.gameResources, this.$stateParams);
        gameResources.GetSingle(this.$stateParams["id"]);
    }

}

export class EditGameComponent implements ng.IComponentOptions {

    public static NAME: string = "editGameView";

    public controller = EditGameController;

    public templateUrl = require("./editGame.html");

}
