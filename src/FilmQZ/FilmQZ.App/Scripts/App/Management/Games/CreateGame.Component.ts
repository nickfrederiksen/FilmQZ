import { ManageGameResources } from "../../Resources/Manage.Game.Resources";

class CreateGameController implements ng.IController {

    public createGameModel: ns.Management.Game.ICreateGameModel = { Name: "" };

    public errorMessage: string | undefined;

    constructor(private manageGameResources: ManageGameResources, private $state: ng.ui.IStateService) {

    }

    public CreateGame() {
        this.errorMessage = undefined;
        this.manageGameResources.Create(this.createGameModel)
            .then((resp) => {
                const newId = resp.data.Id;
                this.$state.transitionTo("manage.editGame", { id: newId });
            }, (error) => {
                this.errorMessage = error.statusText;
            });
    }

}

export class CreateGameComponent implements ng.IComponentOptions {

    public static NAME: string = "createGameView";

    public controller = ["manageGameResources", "$state", CreateGameController];

    public templateUrl = require("../../Views/Manage/Games/createGame.html");

}
