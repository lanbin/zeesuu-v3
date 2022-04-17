import { App } from 'vue';
import SearchTable from './component/index.vue';

export default {
  install(Vue: App) {
    Vue.component('SearchTable', SearchTable);
  },
};

