import { getApiUrl } from "../Utils/ApiUrlHelper";

export class ManageRoundResources {

    public static Instance($http: ng.IHttpService) { // DevSkim: ignore DS137138
        return new ManageRoundResources($http);
    }
    private readonly baseUrl = "/api/management/game/{gameId}/rounds";

    constructor(private $http: ng.IHttpService) { // DevSkim: ignore DS137138
    }

    public GetAll(gameId: string) {
        const url = this.GetUrl(gameId);
        return this.$http.get<ns.Management.Round.IRoundListItemModel[]>(url);
    }

    public GetSingle(gameId: string, id: string) {
        const url = this.GetUrl(gameId);
        return this.$http.get<ns.Management.Round.IRoundEntityModel>(url + "/" + id);
    }

    public Update(gameId: string, id: string, model: ns.Management.Round.IUpdateRoundModel) {
        const url = this.GetUrl(gameId);
        return this.$http.put(url + "/" + id, model);
    }

    public Create(gameId: string, model: ns.Management.Round.ICreateRoundModel) {
        const url = this.GetUrl(gameId);
        return this.$http.post<ns.Management.Round.IRoundEntityModel>(url, model);
    }

    public Delete(gameId: string, id: string) {
        const url = this.GetUrl(gameId);
        return this.$http.delete(url + "/" + id);
    }

    private GetUrl(gameId: string) {
        return getApiUrl(this.baseUrl, { gameId });
    }
}
