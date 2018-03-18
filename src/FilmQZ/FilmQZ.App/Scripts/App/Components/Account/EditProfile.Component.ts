import { Component } from "../../Abstracts/Component";
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

export class EditProfileComponent extends Component {
    public controller = ["accountResources", EditProfileController];
    public templateUrl = require("../../Views/Account/editProfile.html");

    constructor(app: angular.IModule) {
        super("editProfileView", app);
    }

    public Route(): ns.ISortedRoute {
        return {
            component: this.name,
            name: "app.editProfile",
            sortOrder: 6,
            url: "^/account/profile",
        };
    }
}
