import marked = require("marked");
import { AccountResources } from "../../Resources/Account.Resources";

class EditProfileController implements ng.IController {
    public message: string = "";
    public profile: ns.Account.IUserProfileUpdateModel = { FullName: "" };
    public renderedDescription: string = "";

    constructor($scope: ng.IScope, $sce: ng.ISCEService, private accountResources: AccountResources) {
        this.loadProfile();

        $scope.$watch(() => this.profile.Description, (value) => {
            if (value == null) {
                this.renderedDescription = "";
            } else {
                this.renderedDescription = $sce.trustAsHtml(marked(value));
            }
        });
    }

    public updateProfile = () => {
        this.accountResources.UpdateProfile(this.profile)
            .then(() => {
                this.loadProfile();
            },
                (err) => {
                    console.log(err);
                    this.message = err.error_description;
                });
    }

    private loadProfile() {
        this.accountResources.GetProfile()
            .then((data) => {
                this.profile = data.data;
            });
    }
}

export class EditProfileComponent implements ng.IComponentOptions {
    public static NAME: string = "editProfileView";
    public controller = ["$scope", "$sce", "accountResources", EditProfileController];
    public templateUrl = require("./editProfile.html");
}
