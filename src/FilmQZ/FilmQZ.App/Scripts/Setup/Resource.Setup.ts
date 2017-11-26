import { ManageGameResources } from "../App/Resources/Manage.Game.Resources";

export function SetupResources(app: angular.IModule): void {

    app.factory("gameResources", ManageGameResources.Instance);
}
