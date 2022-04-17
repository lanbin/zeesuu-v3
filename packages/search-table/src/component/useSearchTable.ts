import { reactive } from 'vue';
import {
  iSearchTableFormItemDatePicker,
  iSearchTableFormOptionItem,
  iSearchTablePropsConfig,
} from './index.d';

export default () => {
  //  Default Table Config
  const tableConfig = reactive<iSearchTablePropsConfig>({
    apiUrl: '',
    formOptions: [],
    resetBtnText: '重置查询条件',
    queryBtnText: '查询',
    rowKey: 'id',
    fetchNow: true,
    pagination: {},
    pageAttrs: {
      total: 0,
      page: 1,
      size: 10,
      show: true,
    },
    pageOffset: 0,
    listName: 'rows',
    itemPerRow: 4,
    showResetBtn: true,
    fetchAfterReset: true,
    tableAttrs: {},
    beforeQuery: (data: any) => ({}),
    querySuccess: () => ({}),
  });

  const defaultDatePickerConfig = ({ label, ...res }: iSearchTableFormItemDatePicker) =>
    ({
      type: 'el-date-picker',
      name: 'date',
      label,
      ...res,
    } as iSearchTableFormOptionItem);

  return {
    tableConfig,
    defaultDatePickerConfig,
  };
};

