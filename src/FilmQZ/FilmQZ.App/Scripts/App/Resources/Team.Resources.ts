export class TeamResources {

    public static Instance($http: ng.IHttpService) { // DevSkim: ignore DS137138
        return new TeamResources($http);
    }

    private readonly baseUrl = "/api/teams";
    constructor(private $http: ng.IHttpService) { // DevSkim: ignore DS137138 until 2018-04-17

    }

    public GetAll() {
        const url = this.baseUrl;
        return this.$http.get<ns.Teams.ITeamItem[]>(url);
    }

    public GetSingle(teamUrl: string) {
        const url = this.baseUrl + "/" + teamUrl;
        return this.$http.get<ns.Teams.ITeamProfileModel>(url);
    }

    public Subscribe(teamUrl: string) {
        const url = this.baseUrl + "/" + teamUrl + "/subscribe";
        return this.$http.post<void>(url, {});
    }

    public Unsubscribe(teamUrl: string) {
        const url = this.baseUrl + "/" + teamUrl + "/unsubscribe";
        return this.$http.delete<void>(url);
    }
}
