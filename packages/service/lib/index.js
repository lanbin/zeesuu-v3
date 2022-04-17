const PACKNAME = '[@zeesuu-v3/service]';
function firstLetterUppercase(str) {
    return str.replace(/^\S/, (s) => s.toUpperCase());
}
const DomainReg = /^http(s?):\/\/.*?\//;
const ProtocalReg = /^http(s?)/;
const ParamReg = /\((.+?)\)/g;
export default {
    install(Vue, options) {
        const { $http, apis, appRoot = '', isMini = false } = options;
        if (!$http) {
            return console.error(`${PACKNAME} 缺少$http字段配置, 请指定负责请求发送的对象, 如: axios.`);
        }
        const $service = {};
        const $url = {};
        Vue.config.globalProperties.$http = Vue.config.globalProperties.$http || $http;
        if (apis) {
            apis.forEach((api) => {
                let [url, method = 'get', alias = ''] = api.split('|');
                const hasUrlParams = url.match(ParamReg);
                let name = url
                    .replace(DomainReg, '')
                    .replace(ParamReg, '')
                    .split('/')
                    .reduce((prev, current) => {
                    if (current.indexOf('-') > -1) {
                        prev.concat(current.split('-').map((item) => firstLetterUppercase(item)));
                    }
                    else {
                        prev.push(firstLetterUppercase(current));
                    }
                    return prev;
                }, [])
                    .join('');
                if (url.match(ProtocalReg)) {
                    name = firstLetterUppercase(url.match(ProtocalReg)[0]) + name;
                }
                const keyName = alias || name;
                if (!hasUrlParams) {
                    $url[keyName] = url;
                }
                $service[keyName] = (data, option) => {
                    if (hasUrlParams) {
                        if (!data) {
                            return console.error(`${PACKNAME} URL: ${url} 需要填入参数`);
                        }
                        hasUrlParams.forEach((key) => {
                            const dataKey = key.replace(/^\(|\)$/g, '');
                            url = url.replace(key, data[dataKey] || '');
                            delete data[dataKey];
                        });
                    }
                    if (appRoot && !url.match(DomainReg)) {
                        url = `${appRoot}${url}`;
                    }
                    let param = {
                        url,
                        method,
                        ...option,
                    };
                    let R;
                    R = Vue.config.globalProperties.$http;
                    if (isMini) {
                        return R({ data, ...param });
                    }
                    else {
                        return R(method === 'get' ? { params: data, ...param } : { data, ...param });
                    }
                };
            });
        }
        if (options.debug) {
            console.log($service);
            console.log($url);
        }
        Vue.provide('$service', $service);
        window.ZeesuuService = $service;
        Vue.provide('$url', $url);
        window.ZeesuuUrl = $url;
    },
};
//# sourceMappingURL=index.js.map