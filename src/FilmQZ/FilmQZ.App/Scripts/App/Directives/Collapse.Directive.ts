import * as angular from "angular";
import "bootstrap";
import * as jQuery from "jquery";
export class CollapseDirective implements angular.IDirective<ICollapseDirectiveScope> {


    public static Instance() {
        return new CollapseDirective();
    }
    public restrict = "A";

    public scope = {
        list: "=",
        onshow: "&"
    };

    private linkScope: ICollapseDirectiveScope | undefined;

    public link(scope: ICollapseDirectiveScope,
                instanceElement: JQLite,
                instanceAttributes: ng.IAttributes) {

        this.linkScope = scope;
        scope.$watch(() => scope.list, () => {
            const collapse = jQuery(instanceElement).collapse();
            collapse.off("show.bs.collapse", this.handleShowEvent);
            collapse.on("show.bs.collapse", this.handleShowEvent);
        }, true);
        console.log(instanceAttributes);
    }

    private handleShowEvent = (e: Event) => {
        if (this.linkScope != null) {
            const angElm = angular.element(e.target);

            this.linkScope.onshow({ scope: angElm.scope<ng.IScope>() });
        }
    }

}
interface ICollapseDirectiveScope extends ng.IScope {
    list: any[];
    onshow: (args: { scope: ng.IScope }) => void;
}
