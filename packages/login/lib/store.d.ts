import { Store } from 'vuex';
export interface IUserInfo {
    userInfo: {
        userName: string;
        nickeName: string;
        [key: string]: any;
    };
}
export declare type SUserType = Store<IUserInfo>;
declare const store: Store<IUserInfo>;
export default store;
