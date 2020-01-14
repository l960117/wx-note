import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { AtAccordion, AtSwipeAction } from 'taro-ui'
import { getRecommend, getFollowAndFens } from './service'
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

  render () {
    const { followList, fensList } = this.state
    return (
      <View className='center-content'>
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
                <View className='center-item' key={index}  onClick={this.goToFriendHome.bind(this, item.openid)}>
                  <Image src={item.avatar} className='center-item-img'></Image>
                  <Text className='center-item-text'>{item.nickname}</Text>
                </View>
              )
            })
          }
        </AtAccordion>
        <View>
          <Text>推荐关注</Text>
          <View>
            <View>
              <Image></Image>
              <Text></Text>
              <Button>关注</Button>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default UserCenter