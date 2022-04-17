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
  apiUrl?: string;
  listName?: string;
  resetFetchData?: boolean;
  itemPerRow?: number;
  staticData?: iSearchDataItem[];
  fetchMethod?: (data?: any) => Promise<any>;
  formOptions?: Array<iSearchTableFormOptionItem>;
  resetBtnText?: string;
  queryBtnText?: string;
  rowKey?: string;
  beforeQuery?: (data: any) => {};
  querySuccess?: () => {};
  tableAttrs?: any;

  pageAttrs?: any;
  pagination?: Object;
  pageOffset?: number;
  fetchNow?: boolean;
  showResetBtn?: boolean;
  fetchAfterReset?: boolean;
}

export interface iSearchTableFetchDataParams {
  firstPage?: boolean;
}

export type tSearchTableFetchDataMethod = (params?: iSearchTableFetchDataParams) => void;

export interface iSearchTableExposeData {
  searchData: iSearchDataItem;
  fetchData: tSearchTableFetchDataMethod;
  updateSearchFormData: (params: any) => void;
  cleanAllData: () => void;
}

