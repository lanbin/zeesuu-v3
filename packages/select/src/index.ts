import {
  iSelectFormat,
  iSelectOption,
  iSelectOptionConfig,
  iSelectPluginOption,
  iSelectPluginOptionApi,
  iSelectPluginOptionApiParam,
  SelectOptions,
} from './index.d';
import SelectComponent from './index.vue';
import { toRaw } from 'vue';

export * from './index.d';

// Default YesNo Data config
const SELECT_DATA: iSelectOptionConfig = {
  yesNo: [
    {
      label: '否',
      value: 'false',
    },
    {
      label: '是',
      value: 'true',
    },
  ] as SelectOptions,
};

//
export const ApiConfigGenerator = (api: iSelectPluginOptionApiParam): iSelectPluginOptionApi => {
  return Object.assign(
    {
      label: 'name',
      value: 'id',
      key: 'rows',
    },
    api,
  );
};

export default {
  install(Vue: any, option: iSelectPluginOption) {
    const { api, custom } = option;

    if (!api && !custom) return;

    const selectData: iSelectOptionConfig = {
      ...SELECT_DATA,
      ...custom,
    };

    Vue.config.globalProperties.$selectData = selectData;

    // readyForAllData then create component

    // TODO: API

    const $selectFormat: iSelectFormat = {};

    // Package format function
    Object.keys(selectData).forEach((name: string) => {
      $selectFormat[name] = (value, key = 'value') => {
        return (
          (Array.isArray(selectData[name]) ? selectData[name] : []).find(
            (item: iSelectOption) => item[key] == value,
          ) || ({} as iSelectOption)
        );
      };

      // Registry Component
      Vue.component('SearchSelect', SelectComponent);

      Vue.config.globalProperties.$selectData[name] = [...toRaw(selectData[name])];
    });

    Vue.config.globalProperties.$selectFormat = $selectFormat;
  },
};

