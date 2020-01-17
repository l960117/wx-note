import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import login from './services/login'
import { Provider } from "@tarojs/redux";
import models from './models'
import dva from './utils/dva'
if (process.env.TARO_ENV !== 'alipay') {
  require('@tarojs/async-await')
}

import './app.scss'
import './assets/iconfont/iconfont.css';

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});

const store = dvaApp.getStore();

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/home/index',
      'pages/login/index',
      'pages/finding/index',
      'pages/add/index',
      'pages/usercenter/index',
      'pages/friend/index',
      'pages/detail/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#509AFF',
      navigationBarTitleText: '朝夕便签',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      backgroundColor: '#ffffff',
      color: "#8d989c",
      selectedColor: '#509aff',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/home/index',
          text: ''
        },
        {
          pagePath: 'pages/finding/index',
          text: ''
        }
      ]
    },
    usingComponents: {}
  }

  componentWillMount () {
    Taro.hideTabBar()
    this.getOauthStatus()
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  getOauthStatus = () => {
    Taro.getSetting().then(res => {
      console.log(res)
      if(Object.keys(res.authSetting).length === 0 || !res.authSetting['scope.userInfo']){
        Taro.reLaunch({
          url: '/pages/login/index'
        })
      }else{
        this.getUserInfo()
      }
    })
    .catch(err => console.log(err))
  }
  getUserInfo = () => {
    Taro.getUserInfo({
      lang: 'zh_CN'
    }).then( res => {
      Taro.setStorageSync('userInfo', JSON.stringify(res.userInfo))
      console.log(res.userInfo)
      login(res.userInfo)
    })
    .catch( err => console.log(err) )
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <View />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
