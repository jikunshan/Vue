let parts = [];

function setParamsSerializer(rootKey, params) {
	if (params === null || typeof params === 'undefined') {
		return;
	}
	if (Array.isArray(params)) {
		params.forEach((v, k) => {
			if (rootKey === null || rootKey === 'undefined') {
				setParamsSerializer('[' + k + ']', params[k]);
			} else {
				setParamsSerializer(rootKey + '[' + k + ']', params[k]);
			}
		});
	} else if (typeof params === 'object') {
		Object.keys(params).forEach(key => {
			if (rootKey === null || rootKey === 'undefined') {
				setParamsSerializer(key, params[key]);
			} else {
				setParamsSerializer(rootKey + '.' + key, params[key]);
			}

		})
	} else {
		parts.push(rootKey + '=' + params);
	}
};

export function paramsSerializer(params) {
	parts = [];
	setParamsSerializer(null, params);
	return parts.join('&');
}

export default {
	paramsSerializer
}
