import { ManageGameResources } from "../../Resources/Manage.Game.Resources";
import { ManageRoundResources } from "../../Resources/Manage.Round.Resources";
import { EditRoundController } from "./Directives/EditRound.Directive";

class EditGameController implements ng.IController {

    public gameModel: ns.Management.Game.IGameEntityModel | undefined;
    public rounds: ns.Management.Round.IEditiableRoundListItem[] = [];
    private asyncJobs: string[] = [];

    constructor(private $scope: ns.Management.Game.IEditGameComponentScope,
        private $stateParams: ng.ui.IStateParamsService,
        private gameResources: ManageGameResources,
        private roundResources: ManageRoundResources) {

        this.loadGame();
    }

    public saveGame() {
        if (this.gameModel != null && this.asyncJobs.length === 0) {

            const gameId = this.gameModel.Id;
            this.asyncJobs.push(gameId);

            const updateModel: ns.Management.Game.IUpdateGameModel = {
                Name: this.gameModel.Name
            };

            this.gameResources.Update(gameId, updateModel)
                .then(() => {
                    this.$scope.editGame.$setSubmitted();
                    this.asyncJobs.splice(this.asyncJobs.indexOf(gameId), 1);
                    if (this.asyncJobs.length === 0) {
                        this.loadGame();
                    }
                }, (error) => {
                    console.error(error);
                });

            this.saveRounds(gameId);
        }
    }

    public addRound() {
        if (this.gameModel != null) {
            const gameId = this.gameModel.Id;
            const roundModel: ns.Management.Round.IEditiableRoundListItem = {
                CreatedDate: new Date(),
                Description: "",
                GameId: gameId,
                isDeleted: false,
                isNew: true,
                Name: "",
                Id: "new-round-" + (new Date().valueOf())
            };

            this.rounds.push(roundModel);
        }
    }

    public onRoundOpen(scope: ns.IControllerScope) {
        const controller = scope.$ctrl as EditRoundController;
        controller.loadQuestions();
    }

    private saveRounds(gameId: string) {
        for (const round of this.rounds) {
            this.asyncJobs.push(round.Id);
            if (round.isDeleted === true) {
                if (round.isNew !== true) {
                    this.deleteRound(gameId, round);
                } else {
                    this.asyncJobs.splice(this.asyncJobs.indexOf(round.Id), 1);
                    if (this.asyncJobs.length === 0) {
                        this.loadGame();
                    }
                }
            } else if (round.isNew === true) {
                this.createRound(gameId, round);
            } else {
                this.updateRound(gameId, round);
            }
        }
    }

    private deleteRound(gameId: string, round: ns.Management.Round.IEditiableRoundListItem) {

        this.roundResources.Delete(gameId, round.Id)
            .then(() => {
                this.asyncJobs.splice(this.asyncJobs.indexOf(round.Id), 1);
                if (this.asyncJobs.length === 0) {
                    this.loadGame();
                }
            });
    }

    private createRound(gameId: string, round: ns.Management.Round.IEditiableRoundListItem) {
        const createModel: ns.Management.Round.ICreateRoundModel = {
            Description: round.Description,
            Name: round.Name
        };

        this.roundResources.Create(gameId, createModel)
            .then(() => {
                this.asyncJobs.splice(this.asyncJobs.indexOf(round.Id), 1);
                if (this.asyncJobs.length === 0) {
                    this.loadGame();
                }
            });
    }

    private updateRound(gameId: string, round: ns.Management.Round.IEditiableRoundListItem) {
        const roundUpdateModel: ns.Management.Round.IUpdateRoundModel = {
            Description: round.Description,
            Name: round.Name
        };
        this.roundResources.Update(gameId, round.Id, roundUpdateModel)
            .then(() => {
                this.asyncJobs.splice(this.asyncJobs.indexOf(round.Id), 1);
                if (this.asyncJobs.length === 0) {
                    this.loadGame();
                }
            });
    }

    private loadGame() {

        this.loadRounds();
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
