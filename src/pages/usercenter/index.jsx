import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtAccordion, AtSwipeAction, AtMessage } from 'taro-ui'
import { getRecommend, getFollowAndFens, addFollow, cancelFollow } from './service'
import './index.scss'

class UserCenter extends Component {

  state = {
    followOpen: false,
    fensOpen: false,
    recommendList: [],
    followList: [],
    fensList: []
  }

  componentWillMount () {
    getRecommend({openid: JSON.parse(Taro.getStorageSync('key')).openid}).then((res) => {
      if (res.resultCode === 200) {
        this.setState({
          recommendList: res.data.recommendList
        })
      }
    })
    getFollowAndFens({openid: JSON.parse(Taro.getStorageSync('key')).openid}).then((res) => {
      if (res.resultCode === 200) {
        this.setState({
          followList: res.data.followList,
          fensList: res.data.fensList
        })
      }
    })
  }

  handleFollowClick (value) {
    this.setState({
      followOpen: value
    })
  }

  handleFensClick (value) {
    this.setState({
      fensOpen: value
    })
  }

  goToFriendHome (openid) {
    Taro.navigateTo({
      url: '/pages/friend/index?openid=' + openid
    })
  }

  addFolow (friendid) {
    let params = {
      openid: JSON.parse(Taro.getStorageSync('key')).openid,
      friendid: friendid
    }
    addFollow(params).then((res) => {
      if (res.resultCode === 200) {
        Taro.atMessage({
          'message': '关注成功',
          'type': 'success'
        })
      } else {
        Taro.atMessage({
          'message': '关注失败',
          'type': 'warning'
        })
      }
    })
    .catch((res) => {
      console.log(res)
      Taro.atMessage({
        'message': '关注失败',
        'type': 'warning'
      })
    })
  }

  cancelFollow (friendid) {
    let params = {
      openid: JSON.parse(Taro.getStorageSync('key')).openid,
      friendid: friendid
    }
    cancelFollow(params).then((res) => {
      if (res.resultCode === 200) {
        Taro.atMessage({
          'message': '取消关注成功',
          'type': 'success'
        })
      } else {
        Taro.atMessage({
          'message': '取消关注失败',
          'type': 'warning'
        })
      }
    })
    .catch((res) => {
      console.log(res)
      Taro.atMessage({
        'message': '取消关注失败',
        'type': 'warning'
      })
    })
  }

  render () {
    const { followList, fensList, recommendList } = this.state
    return (
      <View className='center-content'>
        <View className='recommend-content'>
          <View className='recommend-bottom'>
            {
              recommendList.map((item) => {
                return (
                  <View key={item.id} className='recommend-item'>
                    <View className='recommend-item-detail'>
                      <Image src={item.avatar} className='recommend-image'></Image>
                      <Text className='recommend-nickname'>{item.nickname}</Text>
                    </View>
                    <View className='recommend-btn'>
                      <Text className='iconfont iconjia1 recommend-btn-icon'></Text>
                      <Text className='recommend-btn-text' onClick={this.addFolow.bind(this, item.openid)}>关注</Text>
                    </View>
                  </View>
                )
              })
            }
          </View>
          <Text>换一批~</Text>
        </View>
        <AtAccordion
          open={this.state.followOpen}
          onClick={this.handleFollowClick.bind(this)}
          title='关注'
        >
          {
            followList.map((item, index) => {
              return (
                <AtSwipeAction key={index} autoClose options={[
                  {
                    text: '取消关注',
                    style: {
                      backgroundColor: '#FF4949'
                    }
                  }
                ]}
                  onClick={this.cancelFollow.bind(this, item.openid)}
                >
                  <View className='center-item' onClick={this.goToFriendHome.bind(this, item.openid)}>
                    <Image src={item.avatar} className='center-item-img'></Image>
                    <Text className='center-item-text'>{item.nickname}</Text>
                  </View>
                </AtSwipeAction>
              )
            })
          }
        </AtAccordion>
        <AtAccordion
          open={this.state.fensOpen}
          onClick={this.handleFensClick.bind(this)}
          title='粉丝'
        >
          {
            fensList.map((item, index) => {
              return (
                <View className='center-item' key={index} onClick={this.goToFriendHome.bind(this, item.openid)}>
                  <Image src={item.avatar} className='center-item-img'></Image>
                  <Text className='center-item-text'>{item.nickname}</Text>
                </View>
              )
            })
          }
        </AtAccordion>
        <AtMessage />
      </View>
    )
  }
}

export default UserCenter