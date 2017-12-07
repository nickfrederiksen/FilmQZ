
export class ManageGameResources implements
    ns.Resources.ICrudResource<ns.Management.Game.IUpdateGameModel, ns.Management.Game.ICreateGameModel> {

    public static Instance($http: ng.IHttpService) { // DevSkim: ignore DS137138
        return new ManageGameResources($http);
    }
    private readonly baseUrl = "/api/management/game";

    constructor(private $http: ng.IHttpService) { // DevSkim: ignore DS137138

    }

    public GetAll() {
        return this.$http.get<ns.Management.Game.IGameListItemModel[]>(this.baseUrl);
    }

    public GetSingle(id: string) {
        return this.$http.get<ns.Management.Game.IGameEntityModel>(this.baseUrl + "/" + id);
    }

    public Update(id: string, model: ns.Management.Game.IUpdateGameModel) {
        return this.$http.put(this.baseUrl + "/" + id, model);
    }

    public Create(model: ns.Management.Game.ICreateGameModel) {
        return this.$http.post<ns.Management.Game.IGameEntityModel>(this.baseUrl, model);
    }

    public Delete(id: string) {
        return this.$http.delete(this.baseUrl + "/" + id);
    }
}
