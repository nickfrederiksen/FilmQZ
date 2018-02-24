// tslint:disable-next-line:typedef
import "angular-local-storage";

export class AuthService {
    public authentication = {
        Email: "",
        isAuth: false
    };
    private serviceBase = "/";

    constructor(private $http: ng.IHttpService, // DevSkim: ignore DS137138
                private $q: ng.IQService,
                private localStorageService: angular.local.storage.ILocalStorageService) {
    }

    public saveRegistration(registration: INewUserModel): ng.IPromise<ng.IHttpResponse<void>> {

        this.SignOffLocal();

        return this.$http.post<void>(this.serviceBase + "api/account/register", registration)
            .then((response) => {
                return response;
            });

    }

    public login(loginData: ILoginInfo): angular.IPromise<IAuthenticationResponse> {

        const encodedPassword = encodeURIComponent(loginData.Password);
        const encodedEmail = encodeURIComponent(loginData.Email);
        const data: string = "grant_type=password&username=" +
            encodedEmail + "&password=" + encodedPassword + "&client_id=NgAuth.App";

        const deferred: angular.IDeferred<IAuthenticationResponse> = this.$q.defer<IAuthenticationResponse>();

        this.$http.post<IAuthenticationResponse>(this.serviceBase + "token",
            data, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then((response) => {
                const responseData: IAuthenticationResponse = response.data;
                const authInfo: IAuthenticationInfo = { token: responseData.access_token, Email: loginData.Email };

                this.localStorageService.set("authorizationData", authInfo);

                this.authentication.isAuth = true;
                this.authentication.Email = loginData.Email;

                deferred.resolve(responseData);

            },
                (err) => {
                    this.logOut();
                    deferred.reject(err);
                });

        return deferred.promise;

    }

    public logOut(): angular.IPromise<void> {

        const deferred: angular.IDeferred<void> = this.$q.defer<void>();

        this.$http.post("/api/Account/Logout", {})
            .then(() => {

                this.SignOffLocal();
                deferred.resolve();
            }, (err) => {
                this.SignOffLocal();
                deferred.reject(err);
            });

        return deferred.promise;
    }

    private SignOffLocal() {
        this.localStorageService.remove("authorizationData");
        this.authentication.isAuth = false;
        this.authentication.Email = "";
    }

    public fillAuthData(): void {

        const authData: IAuthenticationInfo = this.localStorageService.get<IAuthenticationInfo>("authorizationData");
        if (authData) {
            this.authentication.isAuth = true;
            this.authentication.Email = authData.Email;
        }

    }
}

export interface INewUserModel {
    Email: string;
    Password: string;
    ConfirmPassword: string;
}

export interface ILoginInfo {
    Email: string;
    Password: string;
}

export interface IAuthenticationResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface IAuthenticationInfo {
    token: string;
    Email: string;

}
