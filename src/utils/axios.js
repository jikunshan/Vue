import axios from 'axios';
import qs from 'qs';
import util from './util.js';
var CancelToken = axios.CancelToken;

const httpService = axios.create({
	baseURL: process.env.VUE_APP_API,
	timeout: 3000,
	headers: {
		'Content-Type': 'application/json;utf-8',
	},
	transformRequest: (data, headers) => {
		return data;
	},
	paramsSerializer: function(params) {
		return util.paramsSerializer(params);
	},
});
let cancelRequest = function(config, data) {
	let cancel;
	var type = typeof data;
	if (typeof data === 'string') {
		try {
			return JSON.parse(data);
		} catch (e) {
			config.cancelToken = new CancelToken(c => {
				cancel = c;
			});
			cancel('参数格式错误：{key:value}\n' + e.message);
		}
	}
	return {...data};
}
httpService.interceptors.request.use(config => {

	if (config.method == 'post') {
		config.data = JSON.stringify(cancelRequest(config, config.data));
	} else {
		config.params = cancelRequest(config, config.params);
	}
	return config;
}, error => {
	return Promise.reject(error);
})

// 响应拦截器
httpService.interceptors.response.use(res => {
	return Promise.resolve(res.data);
}, error => {
	return Promise.reject(error);
})
export default httpService;
