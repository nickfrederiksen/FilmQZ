declare namespace ns.Management.Round {

    export interface IRoundListItemModel {
        CreatedDate: Date;
        Description: string;
        GameId: string;
        Id: string;
        Name: string;
    }

    export interface ICreateRoundModel {
        Name: string;
        Description: string;
    }

    export interface IRoundEntityModel extends IRoundListItemModel {

    }

    export interface IUpdateRoundModel extends ICreateRoundModel {
    }

    export interface IEditiableRoundListItem extends IRoundListItemModel {
        isNew?: boolean;
        isDeleted?: boolean;
        isCollapsed?: boolean;
        questions?: ns.Management.Question.IEditiableQuestionListItem[];
    }
}