import Taro from '@tarojs/taro';
import { baseUrl } from './config';
 
export default (options = { method: 'GET', data: {} }) => {
  return Taro.request({
    url: baseUrl + options.url,
    data: options.data,
    headers: {
      'Content-Type': 'application/json'
    },
    method: options.method.toUpperCase(),
  }).then((res) => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      // if (data.resultCode === 401) {
      //   Taro.reLaunch({ url:'/pages/member/login/index'})
      //   return
      // }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  })
}