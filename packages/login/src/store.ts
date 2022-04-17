import { createStore, Store } from 'vuex';

export interface IUserInfo {
  userInfo: {
    userName: string;
    nickeName: string;
    [key: string]: any;
  };
}

export type SUserType = Store<IUserInfo>;

const store = createStore({
  state: {
    userInfo: {
      userName: '',
      nickeName: '',
    },
  },
  getters: {
    userInfo: (state: IUserInfo) => state.userInfo,
  },
  mutations: {
    setUserInfo(state: any, userInfo: IUserInfo) {
      state.userInfo = userInfo;
    },
    cleanUserInfo(state: any) {
      state.userInfo = {};
    },
  },
  actions: {
    setUserInfo(context: any, userInfo: IUserInfo) {
      context.commit('setUserInfo', userInfo);
    },
    cleanUserInfo(context: any) {
      context.commit('cleanUserInfo');
    },
  },
});

export default store;

