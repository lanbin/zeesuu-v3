"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoginPlugin = {
    install(Vue, options) {
        if (options.store) {
        }
        else {
            console.error('[@zeesuu-v3/login] needs a store instance');
        }
    },
};
exports.default = LoginPlugin;
//# sourceMappingURL=index.js.map