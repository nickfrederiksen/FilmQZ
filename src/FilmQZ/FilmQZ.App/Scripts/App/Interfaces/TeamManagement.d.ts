declare namespace ns.Management.Team {
    export interface ITeamEntityModel {
        Id: string;
        Name: string;
        URL: string;
        CreatedDate: Date;

    }

    export interface ITeamListItemModel extends ITeamEntityModel {

    }

    export interface IUpdateTeamModel extends ICreateTeamModel {

    }

    export interface ICreateTeamModel {
        Name: string;
    }
}