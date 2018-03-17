import { AccountResources } from "../../Resources/Account.Resources";

class EditProfileController implements ng.IController {
    public message: string = "";
    public profile: ns.Account.IUserProfileUpdateModel = { FullName: "" };

    constructor(private accountResources: AccountResources) {
        this.loadProfile();
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
    public controller = ["accountResources", EditProfileController];
    public templateUrl = require("../../Views/Account/editProfile.html");
}
