export default (store: any) => ({
  mounted(el: HTMLElement, binding: any, vnode: any) {
    const { value } = binding;
    const permission = store.getters.$permission;

    if (!permission || permission.includes('admin')) {
      return;
    }

    if (value && value instanceof Array) {
      const permissionRoles = value.filter((v) => !!v);
      const hasPermission = permission.some((role: string) => {
        return permissionRoles.includes(role);
      });

      if (!hasPermission || permissionRoles.length === 0) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`使用方式： v-permission="['admin','editor']"`);
    }
  },
});
