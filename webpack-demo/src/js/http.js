import axios from "axios";
import { stringify } from "./lib";

const instance = axios.create({
    baseURL: '',
    timeout: 30000,
    transformRequest: [function (data, headers) {
        // 对发送的 data 进行任意转换处理
        return data;
    }],
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
        // 对接收的 data 进行任意转换处理
        return JSON.parse(data);
    }],
});

instance.interceptors.request.use(
    function (config) {
        config.headers = Object.assign(
            {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            config.headers
        )

        config.params = Object.assign({v: new Date().getTime()}, config.params);

        return config;
    },

    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => response.data
);

const http = {
    get(url, param, header) {
		return instance.get(url, {
			params: param,
			headers: header
		});
	},

	post(url, data, header) {
		return instance.post(url, data, {
			headers: header
		});
	},

	put(url, param, data, header) {
		return instance.put(url, data, {
			params: param,
			headers: header
		})
	},

	delete(url, header) {
		return instance.delete(url, {
			headers: header
		})
	},

	postForm(url, data, header) {
		return instance.post(url, data, {
			transformRequest: [function (data, headers) {
				if(header) {
					Object.assign(header, headers);
				}
				return stringify(data);
			}]
		})
	}
}

export default http