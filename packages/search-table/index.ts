import SearchTable from './index.vue';

export * from './index.d';

export default {
  install(Vue: any, options: any) {
    Vue.component('SearchTable', SearchTable);
  },
};
