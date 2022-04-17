import { App } from 'vue';
import permission, { PermissionPluginProps } from './permission';

export const wrapPermission = (permissionList: string[] = []) => {
  Object.defineProperty(permissionList, 'has', {
    value: (value: string[] | string) => {
      const p = Array.isArray(value) ? value : [value];
      return p.some((item) => permissionList.includes(item));
    },
  });
  return permissionList;
};

const install = function (Vue: App, options: PermissionPluginProps = {}) {
  Vue.directive('permission', permission(options));
};

export default {
  install,
} as any;

