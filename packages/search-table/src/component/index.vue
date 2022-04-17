<template>
  <div class="search-table-box">
    <div>123</div>
    <!-- Inputs -->
    <ElRow :gutter="10" class="component-box">
      <ElCol
        :span="24 / innerConfig.itemPerRow!"
        v-for="(formItem, index) in innerConfig.formOptions"
        :key="index"
      >
        <component
          :is="formItem.type"
          :label="formItem.label"
          :conf="formItem.conf"
          :clearable="true"
          :placeholder="formItem.$attrs?.placeholder || formItem.label"
          @keyup.enter="fetchData({ firstPage: true })"
          v-bind="formItem.$attrs"
          v-model="searchData[formItem.name]"
          style="width: 100%"
        ></component>
      </ElCol>
    </ElRow>
    <!-- Buttons -->
    <div class="search-table-btn-box">
      <slot name="before-btn"></slot>
      <ElButton
        type="primary"
        @click="fetchData({ firstPage: true })"
        v-if="hasFormOptions"
        :icon="Search"
      >
        {{ innerConfig.queryBtnText }}
      </ElButton>
      <ElButton
        @click="resetSearchData"
        v-if="innerConfig.showResetBtn && hasFormOptions"
        :icon="DeleteFilled"
      >
        {{ innerConfig.resetBtnText }}
      </ElButton>
      <slot name="after-btn"></slot>
    </div>
    <!-- Table -->
    <ElTable :data="tableData" :border="true" v-bind="innerConfig.tableAttrs">
      <slot></slot>
    </ElTable>
    <!-- Pagination -->
    <div class="pagination-box" v-if="innerConfig.pageAttrs.show">
      <ElPagination
        :layout="innerConfig.pageAttrs.layout"
        :current-page="innerConfig.pageAttrs.page"
        :page-size="innerConfig.pageAttrs.size"
        :total="innerConfig.pageAttrs.total"
        :page-sizes="innerConfig.pageAttrs.pageSizes"
        @current-change="pageChanged"
        @size-change="sizeChanged"
      ></ElPagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    iSearchTableExposeData,
    iSearchTablePropsConfig,
    iSearchDataItem,
    tSearchTableFetchDataMethod,
  } from './index.d';
  import useSearchTable from './useSearchTable';
  import { PropType, ref, computed, reactive, onMounted, watch } from 'vue';
  import { Search, DeleteFilled } from '@element-plus/icons-vue';
  import merge from 'lodash-es/merge';
  import clone from 'lodash-es/clone';
  import isEqual from 'lodash-es/isEqual';

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
  const preSearchData = ref<iSearchDataItem>({});
  const initSearchData = reactive<iSearchDataItem>({});

  // Update Inner Config
  const innerConfig = computed<iSearchTablePropsConfig>(() => {
    return reactive(merge(tableConfig, options));
  });

  // update UI when static data changed
  watch(
    () => options.staticData,
    () => {
      if (!innerConfig.value.fetchMethod) {
        fetchData();
      }
    },
  );

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

  const updateStaticDataConfig = () => {
    innerConfig.value.pageAttrs.total = options.staticData?.length;

    tableData.value = clone(options.staticData)?.splice(
      (innerConfig.value.pageAttrs.page - 1) * innerConfig.value.pageAttrs.size,
      innerConfig.value.pageAttrs.size,
    );
  };

  // Fetch Table Data
  const fetchData: tSearchTableFetchDataMethod = async (params) => {
    if (params?.firstPage) {
      innerConfig.value.pageAttrs.page = 1;
    }

    // If has static data and has no fetchMethod
    if (Array.isArray(innerConfig.value.staticData) && !innerConfig.value.fetchMethod) {
      updateStaticDataConfig();
    } else {
      if (innerConfig.value.fetchMethod) {
        if (innerConfig.value.beforeQuery) {
          innerConfig.value.beforeQuery(searchData);
        }

        if (!isEqual(preSearchData.value, searchData)) {
          innerConfig.value.pageAttrs.page = 1;
        }

        preSearchData.value = clone(searchData);

        const result = await innerConfig.value.fetchMethod({
          ...searchData,
          page: innerConfig.value.pageAttrs.page,
          size: innerConfig.value.pageAttrs.size,
        });

        innerConfig.value.pageAttrs.total = result.total;

        tableData.value = result[innerConfig?.value?.listName || 'rows'];
        // Fetch Success callback
        innerConfig.value.querySuccess && innerConfig.value.querySuccess();
      }
      emits('search', searchData);
    }
  };

  const pageChanged = (page: number) => {
    innerConfig.value.pageAttrs.page = page;
    fetchData();
  };

  const sizeChanged = (size: number) => {
    innerConfig.value.pageAttrs.size = size;
    innerConfig.value.pageAttrs.page = 1;
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

  const cleanAllData = () => {
    innerConfig.value.pageAttrs.total = 0;
    innerConfig.value.pageAttrs.page = 1;
    tableData.value = [];
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
    cleanAllData,
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

