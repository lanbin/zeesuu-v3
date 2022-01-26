<template>
  <div class="${name}-select sc-select">
    <el-select
      style="width: 100%"
      v-model="selectVal"
      clearable
      filterable
      v-bind="$attrs"
      :placeholder="label"
      @change="selectHandler"
    >
      <el-option
        :value="opt.value.toString()"
        :label="opt.label"
        v-for="(opt: any, index) in loopData"
        :key="index"
      ></el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
  import { getCurrentInstance, getCurrentScope, onMounted, reactive, ref, watch } from 'vue';

  const { label, value, conf, valueJoiner, type } = defineProps({
    type: {
      type: String,
      default: '',
    },
    label: {
      type: String,
    },
    value: {
      required: true,
    },
    conf: {
      type: Object,
      default: () => {},
    },
    valueJoiner: {
      type: String,
      default: ',',
    },
  });

  const emits = defineEmits(['update:value']);

  const selectVal = ref('');
  const loopData = reactive([]);

  watch(
    () => value,
    () => {
      setDefaultValue();
    },
  );

  onMounted(() => {
    setData();
  });

  const setData = () => {
    if (type) {
      Object.assign(
        loopData,
        getCurrentInstance()?.appContext.app.config.globalProperties.$selectData[type],
      );
      setDefaultValue();
    }
  };

  const selectHandler = () => {
    emits(
      'update:value',
      ['true', 'false'].indexOf(selectVal.value) > -1
        ? selectVal.value === 'true'
        : // 如果是数组则返回拼接字符串,不是则返回值本身
        Array.isArray(selectVal.value)
        ? selectVal.value.join(valueJoiner)
        : selectVal.value,
    );
  };

  const setDefaultValue = () => {
    let value = '';

    if (conf && typeof conf.setDefaultIndex !== 'undefined') {
      selectVal.value = (loopData[conf.setDefaultIndex] as any).toString();
      selectHandler();
      delete conf.setDefaultIndex;
      return;
    }

    switch (typeof value) {
      case 'undefined':
        value = '';
        break;
      default:
        value = value.toString();
    }

    // selectVal.value = value.length > 0 && $attrs.multiple ? value.split(valueJoiner) : value;
  };
</script>
