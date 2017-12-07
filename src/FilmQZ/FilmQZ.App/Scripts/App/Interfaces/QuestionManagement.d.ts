declare namespace ns.Management.Question {

    export interface IQuestionListItemModel {
        Id: string;
        CreatedDate: Date;
        Point: number;
        QuestionType: QuestionType;
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
}