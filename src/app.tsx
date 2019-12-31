import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import login from './services/login'

import './app.scss'
import './assets/iconfont/iconfont.css';

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
      'pages/add/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#509AFF',
      navigationBarTitleText: '朝夕便签',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#8d989c",
      "selectedColor": "#509aff",
      "list": [
        {
          "pagePath": "pages/home/index",
          "text": "书签"
        },
        {
          "pagePath": "pages/add/index",
          "text": ""
        },
        {
          "pagePath": "pages/finding/index",
          "text": "发现"
        }
      ]
    }
  }

  componentWillMount () {
    Taro.hideTabBar();
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
        Taro.navigateTo({
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
      login()
    })
    .catch( err => console.log(err) )
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <View />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
