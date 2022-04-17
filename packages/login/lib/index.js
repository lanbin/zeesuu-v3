import store from './store';
export const INJECT_KEY_STORE_USERINFO = Symbol('inject-key-store-userinfo');
export const IK_PROVIDE_SET_USERINFO = Symbol('ik-provide-set-userinfo');
export const IK_PROVIDE_CLEAN_USERINFO = Symbol('ik-provide-clean-userinfo');
export default {
    install(Vue, options) {
        if (options.store) {
            Vue.use(store, INJECT_KEY_STORE_USERINFO);
        }
        Vue.provide(IK_PROVIDE_SET_USERINFO, (userInfo) => {
            store.commit('setUserInfo', userInfo);
        });
        Vue.provide(IK_PROVIDE_CLEAN_USERINFO, () => {
            store.commit('cleanUserInfo');
        });
    },
};
//# sourceMappingURL=index.js.map