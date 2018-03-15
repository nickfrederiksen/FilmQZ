export class AccountResources {
    public static Instance($http: ng.IHttpService) { // DevSkim: ignore DS137138
        return new AccountResources($http);
    }

    private readonly baseUrl = "/api/account";

    constructor(private $http: ng.IHttpService) { // DevSkim: ignore DS137138

    }

    public UpdateProfile(profile: ns.Account.IUserProfileUpdateModel) {
        return this.$http.put<void>(this.baseUrl + "/profile", profile);
    }

    public GetProfile(id: string = "") {
        return this.$http.get<ns.Account.IUserProfileModel>(this.baseUrl + "/profile/" + id);
    }
}
