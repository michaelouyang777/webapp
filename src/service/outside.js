import axios from 'axios'
import { Toast } from 'mint-ui';

/**
 * 获取列表——外出管理
 */
var getPage4Outside = () => {
  return new Promise((resolve, reject) => {
    axios.get("/api/v1/outside/list", {
    }).then(function(result){
      resolve(result)
    }).catch(function(error){
      Toast(error)
    });
  })
}

export {getPage4Outside}
