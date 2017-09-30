import * as $ from "jquery";

module TestModule {
    export class Test {
        constructor() {
            console.log("Testing", $);
        }
    }
    // tslint:disable-next-line:no-unused-expression
    new Test();
}

export = TestModule;