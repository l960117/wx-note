import Taro from '@tarojs/taro'
import loginIn from './app'

const login = (userInfo) => {
  Taro.login().then(res => {
    loginIn({code: res.code ||'', avatar: userInfo.avatarUrl, nickname: userInfo.nickName})
    .then((data) => {
      if (data.resultCode === 200) {
        Taro.setStorageSync('key', data.data)
        Taro.switchTab({
          url: '/pages/home/index'
        })
      }
    })
  })
}

export default login