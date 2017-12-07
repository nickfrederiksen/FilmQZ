import { ManageGameResources } from "../../Resources/Manage.Game.Resources";

class CreateGameController implements ng.IController {

    public createGameModel: ns.Management.Game.ICreateGameModel = { Name: "" };

    constructor(private gameResources: ManageGameResources, private $state: ng.ui.IStateService) {

    }

    public CreateGame() {
        this.gameResources.Create(this.createGameModel)
            .then((resp) => {
                const newId = resp.data.Id;
                this.$state.transitionTo("manage.editGame", { id: newId });
            }, (error) => {
                console.error(error);
            });
    }

}

export class CreateGameComponent implements ng.IComponentOptions {

    public static NAME: string = "createGameView";

    public controller = ["gameResources", "$state", CreateGameController];

    public templateUrl = require("./createGame.html");

}
