import { Component } from "../../../Abstracts/Component";
import { ManageGameResources } from "../../../Resources/Manage.Game.Resources";

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

export class CreateGameComponent extends Component {
    public controller = ["manageGameResources", "$state", CreateGameController];

    public templateUrl = require("../../../Views/Manage/Games/createGame.html");

    constructor(app: angular.IModule) {
        super("createGameView", app);
    }

    public Route(): ns.ISortedRoute {
        return {
            component: this.name,
            name: "manage.createGame",
            sortOrder: 102,
            url: "^/manage/games/create",
        };
    }

}
