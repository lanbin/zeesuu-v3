import { App } from 'vue';
import store, { IUserInfo } from './store';

export const INJECT_KEY_STORE_USERINFO = Symbol('inject-key-store-userinfo');
export const IK_PROVIDE_SET_USERINFO = Symbol('ik-provide-set-userinfo');
export const IK_PROVIDE_CLEAN_USERINFO = Symbol('ik-provide-clean-userinfo');

export default {
  install(Vue: App, options: any) {
    if (options.store) {
      Vue.use(store, INJECT_KEY_STORE_USERINFO);
    }

    Vue.provide(IK_PROVIDE_SET_USERINFO, (userInfo: IUserInfo) => {
      store.commit('setUserInfo', userInfo);
    });

    Vue.provide(IK_PROVIDE_CLEAN_USERINFO, () => {
      store.commit('cleanUserInfo');
    });
  },
} as any;

