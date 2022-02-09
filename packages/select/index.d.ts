// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $selectData: iSelectOptionConfig;
//     $selectFormat: iSelectFormat;
//   }
// }

export interface iSelectPluginOptionApiParam {
  url: string;
}

export interface iSelectPluginOptionApi extends iSelectPluginOptionApiParam {
  label: string;
  value: string;
  key?: string;
}

export interface iSelectPluginOption {
  api?: {
    [key: string]: iSelectPluginOptionApi;
  };
  custom: iSelectOptionConfig;
}

export declare type SelectOptionLabel = string | number | Object;

export interface iSelectOption {
  label: string;
  value: SelectOptionLabel;
}

export declare type SelectOptions = iSelectOption[];

export interface iSelectOptionConfig {
  [key: string]: SelectOptions;
}

export interface iSelectFormat {
  [key: string]: (value: string | number, key: 'label' | 'value') => iSelectOption | '';
}
