import { ManageGameResources } from "../../Resources/Manage.Game.Resources";
import { ManageRoundResources } from "../../Resources/Manage.Round.Resources";

class EditGameController implements ng.IController {

    public gameModel: ns.Management.Game.IGameEntityModel | undefined;
    public rounds: ns.Management.Round.IRoundListItemModel[] = [];

    constructor(private $scope: ns.Management.Game.IEditGameComponentScope,
        private $stateParams: ng.ui.IStateParamsService,
        private gameResources: ManageGameResources,
        private roundResources: ManageRoundResources) {

        this.loadGame();
        this.loadRounds();
    }

    public saveGame() {
        if (this.gameModel != null) {

            const updateModel: ns.Management.Game.IUpdateGameModel = {
                Name: this.gameModel.Name
            };

            this.gameResources.Update(this.gameModel.Id, updateModel)
                .then(() => {
                    this.$scope.editGame.$setSubmitted();
                    this.loadGame();
                }, (error) => {
                    console.error(error);
                });
        }
    }

    private loadGame() {

        this.gameResources.GetSingle(this.$stateParams.id)
            .then((resp) => {
                this.gameModel = resp.data;
                this.$scope.editGame.$setPristine();
            },
            (error) => {
                console.error(error);
            });
    }

    private loadRounds() {

        this.roundResources.GetAll(this.$stateParams.id)
            .then((resp) => {
                this.rounds = resp.data;
            },
            (error) => {
                console.error(error);
            });
    }

}

export class EditGameComponent implements ng.IComponentOptions {

    public static NAME: string = "editGameView";

    public controller = ["$scope", "$stateParams", "gameResources", "roundResources", EditGameController];

    public templateUrl = require("./editGame.html");


}
