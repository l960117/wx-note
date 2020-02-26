import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Block } from '@tarojs/components'
import { AtAccordion, AtSwipeAction, AtMessage } from 'taro-ui'
import { getRecommend, getFollowAndFens, addFollow, cancelFollow } from './service'
import './index.scss'

class UserCenter extends Component {

  state = {
    followOpen: false,
    fensOpen: false,
    recommendList: [],
    followList: [],
    fensList: [],
    disableOpenid: ''
  }

  componentDidShow () {
    this.getRecommendApi()
    this.getFollowAndFensApi()
  }

  getRecommendApi () {
    getRecommend({openid: JSON.parse(Taro.getStorageSync('key')).openid}).then((res) => {
      if (res.resultCode === 200) {
        this.setState({
          recommendList: res.data.recommendList,
          disableOpenid: []
        })
      }
    })
  }

  getFollowAndFensApi () {
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
    const { disableOpenid } = this.state
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
        this.setState({
          disableOpenid: disableOpenid + ('/' + friendid)
        }, () => {
          this.getFollowAndFensApi()
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
        this.getFollowAndFensApi()
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
    const { followList, fensList, recommendList, disableOpenid } = this.state
    return (
      <View className='center-content'>
        {
          recommendList&&recommendList.length !== 0 &&
          <View className='recommend-content'>
            <View className='recommend-bottom'>
              {
                recommendList.map((item) => {
                  return (
                    <View key={item.openid} className='recommend-item'>
                      <View className='recommend-item-detail'>
                        <Image src={item.avatar} className='recommend-image'></Image>
                        <Text className='recommend-nickname'>{item.nickname}</Text>
                      </View>
                      {
                        disableOpenid.indexOf(item.openid) === -1 ?
                        <View className='recommend-btn'>
                          <Text className='iconfont iconjia1 recommend-btn-icon'></Text>
                          <Text className='recommend-btn-text' onClick={this.addFolow.bind(this, item.openid)}>关注</Text>
                        </View>
                        :
                        <View className='recommend-btn'>
                          <Text className='recommend-btn-text'>已关注</Text>
                        </View>
                      } 
                    </View>
                  )
                })
              }
            </View>
            <Text className='change-other-btn' onClick={this.getRecommendApi.bind(this)}>换一批~</Text>
          </View>
        }
        <AtAccordion
          open={this.state.followOpen}
          hasBorder={false}
          onClick={this.handleFollowClick.bind(this)}
          title='关注'
        >
          {
            followList&&followList.length !== 0 ?
            <Block>
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
                      onClick={this.cancelFollow.bind(this, item.friendid)}
                    >
                      <View className='center-item' onClick={this.goToFriendHome.bind(this, item.openid)}>
                        <Image src={item.avatar} className='center-item-img'></Image>
                        <Text className='center-item-text'>{item.nickname}</Text>
                      </View>
                    </AtSwipeAction>
                  )
                })
              }
            </Block>
            :
            <View className='list-empty'>暂无关注，去关注~</View>
          }
        </AtAccordion>
        <AtAccordion
          open={this.state.fensOpen}
          hasBorder={false}
          onClick={this.handleFensClick.bind(this)}
          title='粉丝'
        >
          {
            fensList&&fensList.length !== 0 ?
            <Block>
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
            </Block>
            :
            <View className='list-empty'>nobody 关注你~</View>
          }
        </AtAccordion>
        <AtMessage />
      </View>
    )
  }
}

export default UserCenter