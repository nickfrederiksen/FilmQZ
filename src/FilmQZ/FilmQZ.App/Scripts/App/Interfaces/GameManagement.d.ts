declare namespace ns.Management.Game {

    export interface IGameListItemModel {
        Id: string;
        IsOpen: boolean;
        Name: string;
        URL: string;
        CreatedDate: Date;
    }

    export interface ICreateGameModel {
        Name: string;
    }

    export interface IGameEntityModel extends IGameListItemModel {

    }

    export interface IUpdateGameModel extends ICreateGameModel {
    }
}