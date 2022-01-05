export interface iSearchDataItemAttrs {
  placeholder?: string;
  [key: string]: any;
}

export interface iSearchTableFormOptionItem {
  name: string;
  type: string;
  label: string;
  value?: any;
  $attrs?: iSearchDataItemAttrs;
  conf?: any;
  opt?: any;
}

export interface iSearchTableFormItemDatePicker {
  label: string;
  format?: string;
  [key: string]: any;
}

export interface iSearchDataItem {
  [key: string]: any;
}

export interface iSearchTablePropsConfig {
  apiUrl: string;
  formOptions?: Array<iSearchTableFormOptionItem>;
  resetBtnText?: string;
  queryBtnText?: string;
  rowKey?: string;
  listName?: string;
  itemPerRow?: number | string;
  beforeQuery?: Function;
  querySuccess?: Function;
  tableAttrs?: any;

  //   TODO:
  pageAttrs?: any;
  pagination?: Object;
  pageOffset?: number;
  fetchNow?: boolean;
  showResetBtn?: boolean;
  fetchAfterReset?: boolean;
}

export interface iSearchTableExposeData {
  fetchData: () => void;
  updateSearchFormData: (params: any) => void;
}
