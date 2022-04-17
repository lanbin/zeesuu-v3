export default (options) => (el, binding, vnode) => {
    const { value: show } = binding;
    if (show) {
        if (!options.removeable) {
            el.style.display = 'block';
        }
    }
    else {
        if (!options.removeable) {
            el.style.display = 'none';
        }
        else {
            el.parentNode && el.parentNode.removeChild(el);
        }
    }
};
//# sourceMappingURL=permission.js.map