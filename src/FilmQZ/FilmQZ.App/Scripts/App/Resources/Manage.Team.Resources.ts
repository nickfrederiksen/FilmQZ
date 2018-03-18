export class ManageTeamResources {

    public static Instance($http: ng.IHttpService) { // DevSkim: ignore DS137138
        return new ManageTeamResources($http);
    }
    private readonly baseUrl = "/api/management/teams";

    constructor(private $http: ng.IHttpService) { // DevSkim: ignore DS137138
    }

    public Create(model: ns.Management.Team.ICreateTeamModel) {
        const url = this.baseUrl;
        return this.$http.post<ns.Management.Team.ITeamEntityModel>(url, model);
    }

    public Delete(id: string) {
        const url = this.baseUrl;
        return this.$http.delete(url + "/" + id);
    }

    public KickUser(id: string, userId: string) {
        const url = this.baseUrl;
        return this.$http.delete(url + "/" + id + "/kick/" + userId);
    }

    public GetAll() {
        const url = this.baseUrl;
        return this.$http.get<ns.Management.Team.ITeamListItemModel[]>(url);
    }

    public GetSingle(id: string) {
        const url = this.baseUrl;
        return this.$http.get<ns.Management.Team.ITeamEntityModel>(url + "/" + id);
    }

    public Update(id: string, model: ns.Management.Team.IUpdateTeamModel) {
        const url = this.baseUrl;
        return this.$http.put(url + "/" + id, model);
    }

    public GetMembers(id: string) {
        const url = this.baseUrl;
        return this.$http.get<ns.Management.Team.ITeamMemberModel[]>(url + "/" + id + "/members");
    }
}
