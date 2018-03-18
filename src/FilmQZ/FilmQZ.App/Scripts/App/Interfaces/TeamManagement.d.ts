declare namespace ns.Management.Team {
    export interface ITeamEntityModel extends ITeamListItemModel {

    }

    export interface ITeamListItemModel {
        Id: string;
        Name: string;
        URL: string;
        CreatedDate: Date;
        IsOwner: boolean;

    }

    export interface IUpdateTeamModel extends ICreateTeamModel {

    }

    export interface ICreateTeamModel {
        Name: string;
    }

    export interface ITeamMemberModel {
        UserId: string;
        Name: string;
        CreatedDate: string;
    }
}