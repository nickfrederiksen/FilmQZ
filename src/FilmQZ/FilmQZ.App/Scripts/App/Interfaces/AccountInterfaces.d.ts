declare namespace ns.Account {
    export interface IUserProfileModel {
        public FullName: string;
        public PhoneNumber?: string;
        public Description?: string;
    }

    export interface IUserProfileUpdateModel extends IUserProfileModel {
    }
}