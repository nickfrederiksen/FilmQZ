import { ManageGameResources } from "../App/Resources/Manage.Game.Resources";
import { ManageQuestionResources } from "../App/Resources/Manage.Question.Resources";
import { ManageRoundResources } from "../App/Resources/Manage.Round.Resources";
import { ManageTeamResources } from "../App/Resources/Manage.Team.Resources";

export function SetupResources(app: angular.IModule): void {

    app.factory("gameResources", ["$http", ManageGameResources.Instance]);
    app.factory("roundResources", ["$http", ManageRoundResources.Instance]);
    app.factory("questionResources", ["$http", ManageQuestionResources.Instance]);
    app.factory("teamResources", ["$http", ManageTeamResources.Instance]);
}
