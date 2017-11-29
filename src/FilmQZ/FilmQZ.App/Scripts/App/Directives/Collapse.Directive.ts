import "bootstrap";
import * as jQuery from "jquery";
export class CollapseDirective implements angular.IDirective<ICollapseDirectiveScope> {

    public static Instance() {
        return new CollapseDirective();
    }
    public restrict = "A";

    public scope = {
        list: "&"
    };
    public link(scope: ICollapseDirectiveScope,
                instanceElement: JQLite,
                instanceAttributes: ng.IAttributes) {
        scope.$watch(() => scope.list, () => {
            jQuery(instanceElement).collapse();
        }, true);
        console.log(instanceAttributes);
    }

}
interface ICollapseDirectiveScope extends ng.IScope {
    list: any[];
}
