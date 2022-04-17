export interface PermissionPluginProps {
  removeable?: boolean;
}

export default (options: PermissionPluginProps) => (el: HTMLElement, binding: any, vnode: any) => {
  const { value: show } = binding;

  if (show) {
    if (!options.removeable) {
      el.style.display = 'block';
    }
  } else {
    if (!options.removeable) {
      el.style.display = 'none';
    } else {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
};

