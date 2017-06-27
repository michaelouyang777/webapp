//报销管理
import axios from 'axios'
import { Toast, Indicator } from 'mint-ui';
import qs from 'qs'

/**
 * 获取列表
 */
let getPage4Receipt = () => {
	return new Promise((resolve, reject) => {
		axios.get("/api/v1/receipt/list", {}).then(function(result) {
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
let openReceipt = (id) => {
	return new Promise((resolve, reject) => {
		axios.get("/api/v1/receipt/info/" + id).then(function(result) {
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
let submitReceipt = (data) => {
	return new Promise((resolve, reject) => {
		axios.post("/api/v1/receipt/add", qs.stringify(data)).then(function(result) {
			Indicator.open('加载中...');
			resolve(result);
		}).catch(function(error) {
			Toast(error);
		})
	})
}

/**
 * 删除一项
 */
let deleteReceipt = (id) => {
	return new Promise((resolve, reject) => {
		axios.get("/api/v1/receipt/del" , id).then(function(result) {
			Indicator.open('加载中...');
			resolve(result);
		}).catch(function(error) {
			Toast(error);
		})
	})
}

export {getPage4Receipt, openReceipt, submitReceipt, deleteReceipt}