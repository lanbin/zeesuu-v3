import { App } from 'vue';
export interface LoginPluginOptions {
    store?: {};
}
declare const LoginPlugin: {
    install(Vue: App, options: LoginPluginOptions): void;
};
export default LoginPlugin;
