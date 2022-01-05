<template>
  <div class="search-table-box">
    {{ tableData }}
    {{ searchData }}
    <!-- Inputs -->
    <el-row :gutter="10" class="component-box">
      <el-col :span="6" v-for="(formItem, index) in innerConfig.formOptions" :key="index">
        <component
          :is="formItem.type"
          :label="formItem.label"
          :conf="formItem.conf"
          :clearable="true"
          :placeholder="formItem.$attrs?.placeholder || formItem.label"
          @keyup.enter="fetchData"
          v-bind="formItem.$attrs"
          v-model="searchData[formItem.name]"
        ></component>
      </el-col>
    </el-row>
    <!-- Buttons -->
    <div class="search-table-btn-box">
      <el-button type="primary" @click="fetchData" v-if="!!innerConfig?.formOptions" :icon="Search">
        {{ innerConfig.queryBtnText }}
      </el-button>
      <el-button
        @click="resetSearchData"
        v-if="innerConfig.showResetBtn && !!innerConfig.formOptions"
        :icon="DeleteFilled"
      >
        {{ innerConfig.resetBtnText }}
      </el-button>
    </div>
    {{ innerConfig.tableAttrs }}
    <!-- Table -->
    <el-table :data="tableData" :border="true" v-bind="innerConfig.tableAttrs">
      <el-table-column type="selection" label=""></el-table-column>
      <el-table-column type="index" label="Index" width="100px"></el-table-column>
      <el-table-column prop="date" label="date"></el-table-column>
      <el-table-column prop="name" label="name"></el-table-column>
      <el-table-column prop="address" label="address"></el-table-column>
    </el-table>
    <!-- Pagination -->
    <div class="pagination-box">
      <el-pagination
        layout="total, prev, pager, next"
        v-bind="innerConfig.pageAttrs"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { iSearchTableExposeData, iSearchTablePropsConfig, iSearchDataItem } from './index';
  import useSearchTable from './useSearchTable';
  import {
    defineProps,
    defineExpose,
    PropType,
    ref,
    computed,
    watch,
    reactive,
    onMounted,
  } from 'vue';
  import { Search, DeleteFilled } from '@element-plus/icons-vue';

  // Props
  const { options } = defineProps({
    options: {
      type: Object as PropType<iSearchTablePropsConfig>,
      default: () => {},
    },
  });

  // Emits
  const emits = defineEmits<{
    (e: 'search', data: iSearchDataItem): void;
    (e: 'reset', data: iSearchDataItem): void;
  }>();

  const { tableConfig } = useSearchTable();

  // Data
  const tableData = ref<any>([]);
  const searchData = reactive<iSearchDataItem>({});
  const initSearchData = reactive<iSearchDataItem>({});

  // Update Inner Config
  const innerConfig = computed<iSearchTablePropsConfig>(() => {
    console.log(options);
    return Object.assign(tableConfig, options);
  });

  // Set Default Search Data
  if (Array.isArray(options.formOptions)) {
    options.formOptions.forEach((item) => {
      searchData[item.name] = item.value;
      initSearchData[item.name] = item.value;
    });
  }

  // Fetch Table Data
  const fetchData = () => {
    console.log('fetch Date from', innerConfig.value.apiUrl, 'with', searchData);
    tableData.value = reactive([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]);

    // Update Pagination
    innerConfig.value.pageAttrs.total = 30;

    // Fetch Success callback
    innerConfig.value.querySuccess && innerConfig.value.querySuccess();
    emits('search', searchData);
  };

  // Set Default Form Data
  const updateSearchFormData = (defaultFormData: any) => {
    Object.assign(searchData, defaultFormData);
    Object.assign(initSearchData, defaultFormData);
  };

  // Reset Search Data
  const resetSearchData = () => {
    Object.assign(searchData, initSearchData);
    emits('reset', searchData);
  };

  // Life Cycle
  onMounted(() => {
    if (innerConfig.value.fetchNow) {
      fetchData();
    }
  });

  // Expose
  defineExpose({
    fetchData,
    updateSearchFormData,
  } as iSearchTableExposeData);
</script>

<style lang="less" scoped>
  .search-table-box {
    width: 100%;
    gap: 10px;
    box-sizing: border-box;
    padding: 5px;
    display: flex;
    flex-direction: column;

    .search-table-btn-box {
      margin: 10px 0;
      box-sizing: border-box;
      display: flex;
    }

    :deep(.el-col) {
      margin-bottom: 10px;
    }

    .component-box {
      padding-bottom: -10px;
    }

    .pagination-box {
      display: flex;
      justify-content: right;
    }
  }
</style>
