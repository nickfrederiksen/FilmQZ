import { ManageGameResources } from "../../Resources/Manage.Game.Resources";
import { ManageQuestionResources } from "../../Resources/Manage.Question.Resources";
import { ManageRoundResources } from "../../Resources/Manage.Round.Resources";

class EditGameController implements ng.IController {

    public gameModel: ns.Management.Game.IGameEntityModel | undefined;
    public rounds: ns.Management.Round.IEditiableRoundListItem[] = [];
    private asyncJobs: string[] = [];

    constructor(private $scope: ns.Management.Game.IEditGameComponentScope,
        private $stateParams: ng.ui.IStateParamsService,
        private manageGameResources: ManageGameResources,
        private manageRoundResources: ManageRoundResources,
        private manageQuestionResources: ManageQuestionResources) {

        this.loadGame();
    }

    public saveGame() {
        if (this.gameModel != null && this.asyncJobs.length === 0) {

            const gameId = this.gameModel.Id;
            this.asyncJobs.push(gameId);

            const updateModel: ns.Management.Game.IUpdateGameModel = {
                Name: this.gameModel.Name
            };

            this.manageGameResources.Update(gameId, updateModel)
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
                Id: "new-round-" + (new Date().valueOf()),
                isDeleted: false,
                isNew: true,
                Name: "",
                questions: []
            };

            this.rounds.push(roundModel);
        }
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

    private saveQuestions(gameId: string, round: ns.Management.Round.IEditiableRoundListItem) {
        if (round.questions != null) {

            for (const question of round.questions) {
                this.asyncJobs.push(question.Id);
                if (question.isDeleted === true) {
                    if (question.isNew !== true) {
                        this.deleteQuestion(gameId, round.Id, question);
                    } else {
                        this.asyncJobs.splice(this.asyncJobs.indexOf(question.Id), 1);
                        if (this.asyncJobs.length === 0) {
                            this.loadGame();
                        }
                    }
                } else if (question.isNew === true) {
                    this.createQuestion(gameId, round.Id, question);
                } else {
                    this.updateQuestion(gameId, round.Id, question);
                }
            }
        }
    }

    private deleteRound(gameId: string, round: ns.Management.Round.IEditiableRoundListItem) {

        this.manageRoundResources.Delete(gameId, round.Id)
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

        this.manageRoundResources.Create(gameId, createModel)
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
        this.manageRoundResources.Update(gameId, round.Id, roundUpdateModel)
            .then(() => {
                this.asyncJobs.splice(this.asyncJobs.indexOf(round.Id), 1);
                if (this.asyncJobs.length === 0) {
                    this.loadGame();
                }
            });

        this.saveQuestions(gameId, round);
    }

    private deleteQuestion(gameId: string,
        roundId: string,
        question: ns.Management.Question.IEditiableQuestionListItem) {

        this.manageQuestionResources.Delete(gameId, roundId, question.Id)
            .then(() => {
                this.asyncJobs.splice(this.asyncJobs.indexOf(question.Id), 1);
                if (this.asyncJobs.length === 0) {
                    this.loadGame();
                }
            });
    }

    private createQuestion(gameId: string,
        roundId: string,
        question: ns.Management.Question.IEditiableQuestionListItem) {

        const createModel: ns.Management.Question.ICreateQuestionModel = {
            Point: question.Point,
            QuestionType: question.QuestionType,
            Text: question.Text
        };

        this.manageQuestionResources.Create(gameId, roundId, createModel)
            .then(() => {
                this.asyncJobs.splice(this.asyncJobs.indexOf(question.Id), 1);
                if (this.asyncJobs.length === 0) {
                    this.loadGame();
                }
            });
    }

    private updateQuestion(gameId: string,
        roundId: string,
        question: ns.Management.Question.IEditiableQuestionListItem) {

        const roundUpdateModel: ns.Management.Question.IUpdateQuestionModel = {
            Point: question.Point,
            QuestionType: question.QuestionType,
            Text: question.Text
        };
        this.manageQuestionResources.Update(gameId, roundId, question.Id, roundUpdateModel)
            .then(() => {
                this.asyncJobs.splice(this.asyncJobs.indexOf(question.Id), 1);
                if (this.asyncJobs.length === 0) {
                    this.loadGame();
                }
            });
    }

    private loadGame() {

        this.loadRounds();
        this.manageGameResources.GetSingle(this.$stateParams.id)
            .then((resp) => {
                this.gameModel = resp.data;
                this.$scope.editGame.$setPristine();
            },
                (error) => {
                    console.error(error);
                });
    }

    private loadRounds() {

        this.manageRoundResources.GetAll(this.$stateParams.id)
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

    public controller = ["$scope",
        "$stateParams", "manageGameResources", "manageRoundResources", "manageQuestionResources", EditGameController];

    public templateUrl = require("../../Views/Manage/Games/editGame.html");

}
