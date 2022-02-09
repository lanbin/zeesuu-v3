<template>
  <div class="search-table-box">
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
      <slot name="before-btn"></slot>
      <el-button type="primary" @click="fetchData" v-if="hasFormOptions" :icon="Search">
        {{ innerConfig.queryBtnText }}
      </el-button>
      <el-button
        @click="resetSearchData"
        v-if="innerConfig.showResetBtn && hasFormOptions"
        :icon="DeleteFilled"
      >
        {{ innerConfig.resetBtnText }}
      </el-button>
      <slot name="after-btn"></slot>
    </div>
    <!-- Table -->
    <el-table :data="tableData" :border="true" v-bind="innerConfig.tableAttrs">
      <slot></slot>
    </el-table>
    <!-- Pagination -->
    <div class="pagination-box">
      <el-pagination
        layout="total, prev, pager, next"
        :pager="innerConfig.pageAttrs.page"
        :page-size="innerConfig.pageAttrs.size"
        :total="innerConfig.pageAttrs.total"
        @current-change="pageChanged"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { iSearchTableExposeData, iSearchTablePropsConfig, iSearchDataItem } from './index.d';
  import useSearchTable from './useSearchTable';
  import { PropType, ref, computed, reactive, onMounted } from 'vue';
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
    return Object.assign(tableConfig, options);
  });

  const hasFormOptions = computed<boolean>(() => {
    if (innerConfig?.value?.formOptions) return innerConfig.value.formOptions.length > 0;
    return false;
  });

  // Set Default Search Data
  if (Array.isArray(options.formOptions)) {
    options.formOptions.forEach((item: any) => {
      searchData[item.name] = item.value;
      initSearchData[item.name] = item.value;
    });
  }

  // Fetch Table Data
  const fetchData = async () => {
    // Update Pagination
    if (innerConfig.value.fetchMethod) {
      const {page, size} = innerConfig.value.pageAttrs
      const result = await innerConfig.value.fetchMethod({
        ...searchData,
       page, 
       size, 
      });
      innerConfig.value.pageAttrs.total = result.total;

      tableData.value = result[innerConfig?.value?.listName];
      // Fetch Success callback
      innerConfig.value.querySuccess && innerConfig.value.querySuccess();
      emits('search', searchData);
    }
  };

  const pageChanged = (page: number) => {
    innerConfig.value.pageAttrs.page = page;
    fetchData();
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
    searchData,
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
      margin: 0 0 10px 0;
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
