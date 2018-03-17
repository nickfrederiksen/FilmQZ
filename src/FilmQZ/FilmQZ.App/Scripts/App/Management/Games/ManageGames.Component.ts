import { ManageGameResources } from "../../Resources/Manage.Game.Resources";

class ManageGamesController implements ng.IController {
    public Games: ns.Management.Game.IGameListItemModel[] = [];

    constructor(private gameResources: ManageGameResources) { // DevSkim: ignore DS137138

        this.loadGames();
    }

    public DeleteGame = (id: string) => {
        if (confirm("Are you sure you want to delete this game?")) {
            this.gameResources.Delete(id)
                .then(() => {
                    this.loadGames();
                });
        }
    }

    private loadGames() {
        this.gameResources.GetAll()
            .then((data) => {
                this.Games = data.data;
            });
    }
}

export class ManageGamesComponent implements ng.IComponentOptions {

    public static NAME: string = "manageGamesView";

    public controller = ["gameResources", ManageGamesController];

    public templateUrl = require("../../Views/Manage/Games/manageGames.html");

}
