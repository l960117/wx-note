import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import login from '../../services/login'

class Home extends Component {

  state = {
    oauthBtnStatus: true, // 授权按钮是否显示 默认为显示
    userInfo: null, // 用户信息
    btnText: '微信授权登录'
  }

  componentWillMount() {
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  onGotUserInfo = res => {
    console.log(res)
    if(res.detail.userInfo){
      Taro.setStorageSync('userInfo', JSON.stringify(res.detail.userInfo))
      login(res.detail.userInfo)
    }else{
      Taro.showModal({
        title: '温馨提示',
        content: '简单的信任，是你我俩故事的开始',
        showCancel: false
      })
        .then(ModalRes => {
          if(ModalRes.confirm){
            this.setState({btnText:'重新授权登录'})
          }
        })
    }
  }
  render () {
    const { btnText } = this.state
    return (
      <View>
        <Button className='login-btn' openType='getUserInfo' onGetUserInfo={this.onGotUserInfo}>{btnText}</Button>
      </View>
    )
  }
}
export default Home;
