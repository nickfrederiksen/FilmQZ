declare namespace ns.Management.Question {

    export interface IQuestionListItemModel {
        Id: string;
        CreatedDate: Date;
        Point: number;
        QuestionType: QuestionType;
        Text: string;
    }

    export interface ICreateQuestionModel {
        Text: string;
        QuestionType: QuestionType;
        Point: number;
    }

    export interface IQuestionEntityModel extends IQuestionListItemModel {

    }

    export interface IUpdateQuestionModel extends ICreateQuestionModel {
    }

    export interface IEditiableQuestionListItem extends IQuestionListItemModel {
        isNew?: boolean;
        isDeleted?: boolean;
        isCollapsed?: boolean;
    }
}