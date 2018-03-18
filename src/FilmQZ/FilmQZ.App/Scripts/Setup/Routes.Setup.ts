import { Component } from "../App/Abstracts/Component";

export function SetupRoutes($stateProvider: ng.ui.IStateProvider, components: Component[]): void {
    const routes: ns.ISortedRoute[] = [];

    components.forEach((component) => {
        const route = component.Route();
        routes.push(route);
    });

    routes.sort((a, b) => a.sortOrder - b.sortOrder).forEach((route) => {
        $stateProvider.state(route);
    });
}
