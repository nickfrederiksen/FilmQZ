declare namespace ns.Teams {
    export interface ITeamItem {
        Name: string;
        URL: string;
    }

    export interface ITeamProfileModel extends ITeamItem {
        CreatedDate: Date;
    }
}