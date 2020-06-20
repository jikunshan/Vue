import httpService from '../utils/axios.js'

const post = function post(url, data) {
	return httpService({
		url: url,
		method: 'post',
		data: data
	});
}

const get = function get(url, params) {
	return httpService({
		url: url,
		method: 'get',
		params: params
	});
}

export default {
	get,
	post
}
