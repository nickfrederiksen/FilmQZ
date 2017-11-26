declare namespace ns {
    export interface ITopNavigationItem {
        isActive: boolean;
        sref: string;
        text: string;
        isVisible: boolean;
        anonymousOnly: boolean;
        authorizedOnly: boolean;
    }
}