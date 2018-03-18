declare namespace ns {
    export interface IDictionary<TValue> {
        [key: string]: TValue;
    }

    export interface ISortedRoute extends ng.ui.IState{
        sortOrder:number;
    }
}