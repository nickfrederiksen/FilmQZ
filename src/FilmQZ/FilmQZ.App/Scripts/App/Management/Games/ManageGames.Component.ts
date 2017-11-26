class ManageGamesController implements ng.IController {
    public Games: ns.Management.Game.IGameListItemModel[] = [];

    constructor(private $http: ng.IHttpService) { //DevSkim: ignore DS137138 

        this.loadGames();
    }

    private loadGames() {
        this.$http.get<ns.Management.Game.IGameListItemModel[]>("/api/management/game")
            .then((data) => {
                this.Games = data.data;
            });
    }
}

export class ManageGamesComponent implements ng.IComponentOptions {

    public static NAME: string = "manageGamesView";

    public controller = ManageGamesController;

    public templateUrl = require("./manageGames.html");

}
