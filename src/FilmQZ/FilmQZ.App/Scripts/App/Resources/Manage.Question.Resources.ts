import { getApiUrl } from "../Utils/ApiUrlHelper";

export class ManageQuestionResources {

    public static Instance($http: ng.IHttpService) { // DevSkim: ignore DS137138
        return new ManageQuestionResources($http);
    }
    private readonly baseUrl = "/api/management/game/{gameId}/rounds/{roundId}/questions";

    constructor(private $http: ng.IHttpService) { // DevSkim: ignore DS137138
    }

    public GetAll(gameId: string, roundId: string) {
        const url = this.GetUrl(gameId, roundId);
        return this.$http.get<ns.Management.Question.IQuestionListItemModel[]>(url);
    }
    public GetSingle(gameId: string, roundId: string, id: string) {
        const url = this.GetUrl(gameId, roundId);
        return this.$http.get<ns.Management.Question.IQuestionEntityModel>(url + "/" + id);
    }
    public Update(gameId: string, roundId: string, id: string, model: ns.Management.Question.IUpdateQuestionModel) {
        const url = this.GetUrl(gameId, roundId);
        return this.$http.put(url + "/" + id, model);
    }
    public Create(gameId: string, roundId: string, model: ns.Management.Question.ICreateQuestionModel) {
        const url = this.GetUrl(gameId, roundId);
        return this.$http.post<ns.Management.Question.IQuestionEntityModel>(url, model);
    }
    public Delete(gameId: string, roundId: string, id: string) {
        const url = this.GetUrl(gameId, roundId);
        return this.$http.delete(url + "/" + id);
    }

    private GetUrl(gameId: string, roundId: string) {
        return getApiUrl(this.baseUrl, { gameId, roundId });
    }
}
