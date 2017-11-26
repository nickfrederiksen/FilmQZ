
export class ManageGameResources implements ns.Resources.ICrudResource<ns.Management.Game.IUpdateGameModel, ns.Management.Game.ICreateGameModel> {
    private readonly baseUrl = "/api/management/game";

    constructor(private $http: ng.IHttpService) { //DevSkim: ignore DS137138 

    }

    public static Instance($http: ng.IHttpService) { //DevSkim: ignore DS137138 
        return new ManageGameResources($http);
    }

    GetAll() {
        return this.$http.get<ns.Management.Game.IGameListItemModel[]>(this.baseUrl);
    }

    GetSingle(id: string) {
        return this.$http.get<ns.Management.Game.IGameEntityModel>(this.baseUrl + "/" + id);
    }

    Update(id: string, model: ns.Management.Game.IUpdateGameModel) {
        return this.$http.put(this.baseUrl + "/" + id, model);
    }

    Create(model: ns.Management.Game.ICreateGameModel) {
        return this.$http.post<ns.Management.Game.IGameEntityModel>(this.baseUrl, model);
    }

    Delete(id: string) {
        return this.$http.delete(this.baseUrl + "/" + id);
    }
}