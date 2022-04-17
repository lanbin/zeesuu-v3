import { createStore } from 'vuex';
const store = createStore({
    state: {
        userInfo: {
            userName: '',
            nickeName: '',
        },
    },
    getters: {
        userInfo: (state) => state.userInfo,
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        cleanUserInfo(state) {
            state.userInfo = {};
        },
    },
    actions: {
        setUserInfo(context, userInfo) {
            context.commit('setUserInfo', userInfo);
        },
        cleanUserInfo(context) {
            context.commit('cleanUserInfo');
        },
    },
});
export default store;
//# sourceMappingURL=store.js.map