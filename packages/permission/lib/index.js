import permission from './permission';
export const wrapPermission = (permissionList = []) => {
    Object.defineProperty(permissionList, 'has', {
        value: (value) => {
            const p = Array.isArray(value) ? value : [value];
            return p.some((item) => permissionList.includes(item));
        },
    });
    return permissionList;
};
const install = function (Vue, options = {}) {
    Vue.directive('permission', permission(options));
};
export default {
    install,
};
//# sourceMappingURL=index.js.map