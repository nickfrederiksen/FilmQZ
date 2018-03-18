import { AccountResources } from "../App/Resources/Account.Resources";
import { ManageGameResources } from "../App/Resources/Manage.Game.Resources";
import { ManageQuestionResources } from "../App/Resources/Manage.Question.Resources";
import { ManageRoundResources } from "../App/Resources/Manage.Round.Resources";
import { ManageTeamResources } from "../App/Resources/Manage.Team.Resources";
import { TeamResources } from "../App/Resources/Team.Resources";

export function SetupResources(app: angular.IModule): void {

    app.factory("manageGameResources", ["$http", ManageGameResources.Instance]);
    app.factory("manageRoundResources", ["$http", ManageRoundResources.Instance]);
    app.factory("manageQuestionResources", ["$http", ManageQuestionResources.Instance]);
    app.factory("manageTeamResources", ["$http", ManageTeamResources.Instance]);

    app.factory("accountResources", ["$http", AccountResources.Instance]);
    app.factory("teamResources", ["$http", TeamResources.Instance]);

}
