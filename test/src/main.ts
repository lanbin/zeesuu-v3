import { createApp } from 'vue';
import App from './App.vue';

import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';

import ZeesuuSelect, { ApiConfigGenerator } from '../../packages/select';
import CustomSelectData from './CustomSelectData';
import { iSelectPluginOption } from '../../packages/select/index.d';

const app = createApp(App);

app.use(ElementPlus);
app.use(ZeesuuSelect, {
  api: {
    superCompanySl: ApiConfigGenerator({ url: 'ApiSuperCompangList' }),
    roleSl: ApiConfigGenerator({ url: 'ApiRoleList' }),
  },
  custom: CustomSelectData,
} as iSelectPluginOption);

app.mount('#app');
