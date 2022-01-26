<script setup lang="ts">
  import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
  import { iSearchTableExposeData, iSearchTablePropsConfig } from '../../packages/search-table';
  import SearchTable from '../../packages/search-table/index.vue';
  import useSearchTable from '../../packages/search-table/useSearchTable';

  const { defaultDatePickerConfig } = useSearchTable();
  const SearchTableRef = ref<iSearchTableExposeData>();
  const yesno = ref(false);
  const alarmType = ref('');

  const tableOptions = reactive({
    apiUrl: '1231312',
    fetchNow: false,
    // Form Options
    formOptions: [
      {
        type: 'el-input',
        name: 'id',
        label: '试试看',
      },
      {
        type: 'SearchSelect',
        name: 'alarmType',
        label: '告警类型',
        $attrs: {
          type: 'alarmType',
        },
      },
      defaultDatePickerConfig({
        label: '日期',
        name: 'date',
        $attrs: {
          format: 'YYYY/MM/DD',
        },
      }),
    ],
    // Table Attrs
    tableAttrs: {
      onRowDblclick: (selection: any) => {
        console.log(selection);
      },
    },
  } as iSearchTablePropsConfig);

  onMounted(() => {
    SearchTableRef.value?.updateSearchFormData({
      id: '123',
      date: '2020-01-01',
      alarmType: '2',
    });
    // SearchTableRef.value?.fetchData();
  });
</script>

<template>
  {{ SearchTableRef?.searchData }}
  <SearchTable :options="tableOptions" ref="SearchTableRef"></SearchTable>
</template>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
