import { ref, reactive, computed } from 'vue';
import {
  iSearchTableFormItemDatePicker,
  iSearchTableFormOptionItem,
  iSearchTablePropsConfig,
} from './index';

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
    },
    pageOffset: 0,
    listName: 'rows',
    itemPerRow: 4,
    showResetBtn: true,
    fetchAfterReset: true,
    tableAttrs: {},
    beforeQuery: () => {},
    querySuccess: () => {},
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
