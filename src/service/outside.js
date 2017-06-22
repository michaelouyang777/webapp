//外出管理
import axios from 'axios'
import { Toast, Indicator } from 'mint-ui';
import qs from 'qs'

/**
 * 获取列表
 */
let getPage4Outside = () => {
	return new Promise((resolve, reject) => {
		axios.get("/api/v1/outside/list", {}).then(function(result) {
			Indicator.open('加载中...');
			resolve(result)
		}).catch(function(error) {
			Toast(error)
		});
	})
}

/**
 * 展示详情
 * @param id
 * @returns {Promise}
 */
let openOutside = (id) => {
	return new Promise((resolve, reject) => {
		axios.get("/api/v1/outside/info/" + id).then(function(result) {
			Indicator.open('加载中...');
			resolve(result);
		}).catch(function(error) {
			Toast(error);
		})
	})
}

/**
 * 提交表单
 */
let submitOutside = (data) => {
	return new Promise((resolve, reject) => {
		axios.post("/api/v1/outside/add", qs.stringify(data)).then(function(result) {
			Indicator.open('加载中...');
			resolve(result);
		}).catch(function(error) {
			Toast(error);
		})
	})
}



export {getPage4Outside, openOutside, submitOutside}