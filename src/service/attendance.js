//请休假管理
import axios from 'axios'
import { Toast, Indicator } from 'mint-ui'
import qs from 'qs'

/**
 * 获取列表
 */
let getPage4Attendance = () => {
	return new Promise((resolve, reject) => {
		axios.get("/api/v1/attendance/list", {}).then(function(result){
			Indicator.open('加载中...');
			resolve(result);
		}).catch(function(error){
			Toast(error)
		});
	})
}

/**
 * 展示详情
 * @param id
 * @returns {Promise}
 */
let openAttendance = (id) => {
	return new Promise((resolve, reject) => {
		axios.get("/api/v1/attendance/info/" + id).then(function(result) {
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
let submitAttendance = (data) => {
	return new Promise((resolve, reject) => {
		axios.post("/api/v1/attendance/add", qs.stringify(data)).then(function(result) {
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
let deleteAttendance = (id) => {
	return new Promise((resolve, reject) => {
		axios.get("/api/v1/attendance/del" , id).then(function(result) {
			Indicator.open('加载中...');
			resolve(result);
		}).catch(function(error) {
			Toast(error);
		})
	})
}

export {getPage4Attendance, openAttendance, submitAttendance, deleteAttendance}