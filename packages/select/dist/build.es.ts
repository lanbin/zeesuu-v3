var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { defineComponent, ref, reactive, watch, onMounted, getCurrentInstance, resolveComponent, openBlock, createElementBlock, createVNode, mergeProps, withCtx, Fragment, renderList, unref, createBlock, toRaw } from "vue";
const _hoisted_1 = { class: "${name}-select sc-select" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    type: {
      type: String,
      default: ""
    },
    label: {
      type: String
    },
    value: {
      required: true
    },
    conf: {
      type: Object,
      default: () => {
      }
    },
    valueJoiner: {
      type: String,
      default: ","
    }
  },
  emits: ["update:value"],
  setup(__props, { emit: emits }) {
    const { label, value, conf, valueJoiner, type } = __props;
    const selectVal = ref("");
    const loopData = reactive([]);
    watch(() => value, () => {
      setDefaultValue();
    });
    onMounted(() => {
      setData();
    });
    const setData = () => {
      var _a;
      if (type) {
        Object.assign(loopData, (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.config.globalProperties.$selectData[type]);
        setDefaultValue();
      }
    };
    const selectHandler = () => {
      emits("update:value", ["true", "false"].indexOf(selectVal.value) > -1 ? selectVal.value === "true" : Array.isArray(selectVal.value) ? selectVal.value.join(valueJoiner) : selectVal.value);
    };
    const setDefaultValue = () => {
      if (conf && typeof conf.setDefaultIndex !== "undefined") {
        selectVal.value = loopData[conf.setDefaultIndex];
        selectHandler();
        delete conf.setDefaultIndex;
        return;
      }
    };
    return (_ctx, _cache) => {
      const _component_el_option = resolveComponent("el-option");
      const _component_el_select = resolveComponent("el-select");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_el_select, mergeProps({
          style: { "width": "100%" },
          modelValue: selectVal.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectVal.value = $event),
          clearable: "",
          filterable: ""
        }, _ctx.$attrs, {
          placeholder: __props.label,
          onChange: selectHandler
        }), {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(loopData), (opt, index2) => {
              return openBlock(), createBlock(_component_el_option, {
                value: opt.value,
                label: opt.label,
                key: index2
              }, null, 8, ["value", "label"]);
            }), 128))
          ]),
          _: 1
        }, 16, ["modelValue", "placeholder"])
      ]);
    };
  }
});
const SELECT_DATA = {
  yesNo: [
    {
      label: "\u5426",
      value: "false"
    },
    {
      label: "\u662F",
      value: "true"
    }
  ]
};
const ApiConfigGenerator = (api) => {
  return Object.assign({
    label: "name",
    value: "id",
    key: "rows"
  }, api);
};
var index = {
  install(Vue, option) {
    const { api, custom } = option;
    if (!api && !custom)
      return;
    const selectData = __spreadValues(__spreadValues({}, SELECT_DATA), custom);
    Vue.config.globalProperties.$selectData = selectData;
    const $selectFormat = {};
    Object.keys(selectData).forEach((name) => {
      $selectFormat[name] = (value, key = "value") => {
        return (Array.isArray(selectData[name]) ? selectData[name] : []).find((item) => item[key] == value) || {};
      };
      Vue.component("SearchSelect", _sfc_main);
      Vue.config.globalProperties.$selectData[name] = [...toRaw(selectData[name])];
    });
    Vue.config.globalProperties.$selectFormat = $selectFormat;
  }
};
export { ApiConfigGenerator, index as default };
