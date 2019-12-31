import Taro from '@tarojs/taro'
import loginIn from './app'

const login = () => {
  Taro.login().then(res => {
    loginIn({code: res.code ||''})
    .then((data) => {
      if (data.resultCode === 200) {
        Taro.setStorageSync('key', data.data)
        Taro.navigateTo({
          url: '/pages/home/index'
        })
      }
    })
  })
}

export default login