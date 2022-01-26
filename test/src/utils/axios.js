import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';

const R = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

/**
 * 请求拦截器
 */
R.interceptors.request.use((_) => {
    const config = _;
    const IS_GET = config.method === 'get';
    const data = (IS_GET ? config.params : config.data) || {};

    // 如果配置了, 就过滤为空的字段
    if (config.filterEmptyField) {
        Object.keys(data).forEach((key) => {
            if (!data[key] && data[key] !== 0) {
                delete data[key];
            }
        });
    }

    if (IS_GET) {
        data['_t'] = Date.now();
        config.params = data;
    } else {
        if (config.headers['Content-Type'] == 'application/json') {
            config.data = data;
        } else if (config.headers['Content-Type'] != 'multipart/form-data') {
            // 为了实现 a=1&a=2&a=3这样的post请求,增加后面的配置
            config.data = qs.stringify(data, { arrayFormat: 'repeat' });
        }
    }

    return {
        ...config,
    };
});

/**
 * 响应拦截器
 */
R.interceptors.response.use(
    (response) => Promise.resolve(response.data),
    (error) => {
        if (error.response && error.response.data) {
            // 如果是用户信息请求接口返回错误,则不用提示
            if (
                // 必须是以api结尾的url,才会被匹配
                ['/api/accountInfo', '/api/allCompanyAndUser'].filter((api) =>
                    (error.response.config.url || '').match(new RegExp(`${api}$`)),
                ).length == 0
            ) {
                Message({
                    type: 'error',
                    message: error.response.data.reason,
                });
            }
        }
        return Promise.reject(error.response);
    },
);

export default R;
