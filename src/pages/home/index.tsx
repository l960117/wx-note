import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import TarBar from '../../components/TarBar'
import './index.scss'

class Home extends Component {

  componentWillMount () {
    console.log(333)
  }

  addNote = () => {

  }
  render () {
    return (
      <View className="home-content">
        <View className="home-top">
          <View className="home-name">
            <Text className="home-nickname">Summer</Text>
            <Text className="iconfont iconwangfan-copy name-btn"></Text>
          </View>
          <View className="home-count">
            <View className="home-count-title1">
              <Text>便签数</Text>
            </View>
            <View className="home-count-weight">
              <Text className="home-count-number">28</Text>
              <Text className="home-count-after">个</Text>
            </View>
            <View className="home-count-bottom">
              <Text className="bottom-text">公开12个，悄悄话16个</Text>
            </View>
          </View>
        </View>
        <View className="home-list">
          <View className="list-item">
            <View className="list-item-left">
              <Text className="item-main">爱读书细节优化,LOGO设计</Text>
              <Text className="item-second">3月10日15：32分</Text>
            </View>
            <Text className={`iconfont iconshoucang-tianchong list-item-right ${false ? 'icon-selected' : ''}`}></Text>
          </View>
        </View>
        <TarBar selected="home" addNote={this.addNote}/>
      </View>
    )
  }
}

export default Home;