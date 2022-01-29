declare global {
  interface Window {
    Vue: any;
    permission: Array<string>;
  }
}

import permission from './permission';

const install = function (Vue: any, { store }: { store: any }) {
  Vue.directive('permission', permission(store));
};

if (window.Vue) {
  window.Vue.use(install); // eslint-disable-line
}

export default install;
