import { ManageGameResources } from "../../Resources/Manage.Game.Resources";

class ManageGamesController implements ng.IController {
    public Games: ns.Management.Game.IGameListItemModel[] = [];

    constructor(private manageGameResources: ManageGameResources) { // DevSkim: ignore DS137138

        this.loadGames();
    }

    public DeleteGame = (id: string) => {
        if (confirm("Are you sure you want to delete this game?")) {
            this.manageGameResources.Delete(id)
                .then(() => {
                    this.loadGames();
                });
        }
    }

    private loadGames() {
        this.manageGameResources.GetAll()
            .then((data) => {
                this.Games = data.data;
            });
    }
}

export class ManageGamesComponent implements ng.IComponentOptions {

    public static NAME: string = "manageGamesView";

    public controller = ["manageGameResources", ManageGamesController];

    public templateUrl = require("../../Views/Manage/Games/manageGames.html");

}
