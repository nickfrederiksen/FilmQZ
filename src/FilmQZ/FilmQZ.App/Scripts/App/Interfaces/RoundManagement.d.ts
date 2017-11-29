declare namespace ns.Management.Round {

    export interface IRoundListItemModel {
        Id: string;
        CreatedDate: Date;
        Name: string;
        Description: string;
        GameId: string;
    }

    export interface ICreateRoundModel {
        Name: string;
        Description: string;
    }

    export interface IRoundEntityModel extends IRoundListItemModel {

    }

    export interface IUpdateRoundModel extends ICreateRoundModel {
    }
}