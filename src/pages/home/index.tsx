import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block, ScrollView } from '@tarojs/components'
import TarBar from '../../components/TarBar'
import getNoteList from './service'
import './index.scss'
import moment from 'moment'

class Home extends Component {

  state = {
    noteList: [],
    totalPrivate: 0,
    totalPublic: 0,
    total: 0,
    nickname: ''
  }

  componentDidShow () {
    console.log(333)
    if (!Taro.getStorageSync('key')) {
      return
    }
    console.log(444)
    if (Taro.getStorageSync('userInfo')) {
      this.setState({
        nickname: JSON.parse(Taro.getStorageSync('userInfo')).nickName
      })
    }
    let params  = {
      openid: JSON.parse(Taro.getStorageSync('key')).openid
    }
    getNoteList(params)
    .then((res) => {
      if (res.resultCode === 200) {
        this.setState({
          noteList: res.data.results || [],
          totalPrivate: res.data.totalPrivate,
          totalPublic: res.data.totalPublic,
          total: res.data.total
        })
      }
    })
  }

  showDetail (data) {
    Taro.navigateTo({
      url: '/pages/detail/index?noteId=' + data.noteId
    })
  }

  goToCenter = () => {
    Taro.navigateTo({url: '/pages/usercenter/index'})
  }
  render () {
    const { noteList, totalPrivate, totalPublic, total, nickname } = this.state
    return (
      <View className="home-content">
        <View className="home-top">
          <View className="home-name">
            <Text className="home-nickname">{nickname}</Text>
            <Text className="iconfont iconwangfan-copy name-btn" onClick={this.goToCenter}></Text>
          </View>
          <View className="home-count">
            <View className="home-count-title1">
              <Text>便签数</Text>
            </View>
            <View className="home-count-weight">
              <Text className="home-count-number">{total}</Text>
              <Text className="home-count-after">个</Text>
            </View>
            <View className="home-count-bottom">
              <Text className="bottom-text">公开{totalPublic}个，悄悄话{totalPrivate}个</Text>
            </View>
          </View>
        </View>
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          >
          <View className="home-list">
            {
              noteList.length !== 0 ?
              <Block>
                {
                  noteList.map((item, noteIndex) => {
                    return (
                      <View className="list-item" key={noteIndex} style={{'border-left': `8rpx solid ${item.color}`}} onClick={this.showDetail.bind(this, item)}>
                        <View className="list-item-left">
                          <Text className="item-main">{item.content}</Text>
                          <Text className="item-second">{moment(item.noteTime).format('YYYY-MM-DD HH:mm')}</Text>
                        </View>
                        <Text className={`iconfont iconshoucang-tianchong list-item-right ${false ? 'icon-selected' : ''}`}></Text>
                      </View>
                    )
                  })
                }
              </Block>
              :
              <View className="no_data_content">
                <Image src="http://39.108.232.210:9166/images/no_data.png" className="no_data"></Image>
                <Text className="no_data_text">还没有写便签，快去写一条吧~</Text>
              </View>
            }
          </View>
        </ScrollView>
        <TarBar selected="home" addNote={this.addNote}/>
      </View>
    )
  }
}

export default Home;