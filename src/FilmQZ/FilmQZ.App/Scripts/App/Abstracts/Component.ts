export abstract class Component implements ng.IComponentOptions {
    public abstract controller: string | ng.Injectable<ng.IControllerConstructor>;
    public abstract templateUrl: string | ng.Injectable<(...args: any[]) => string>;

    constructor(protected name: string, app: angular.IModule) {
        app.component(name, this);
    }

    public abstract Route(): ns.ISortedRoute;
}
