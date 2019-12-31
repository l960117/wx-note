import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import TarBar from '../../components/TarBar'
import getNoteList from './service'
import './index.scss'

class Home extends Component {

  state = {
    noteList: []
  }

  componentWillMount () {
    let params  = {
      openid: JSON.parse(Taro.getStorageSync('key')).openid
    }
    getNoteList(params)
    .then((res) => {
      if (res.resultCode === 200) {
        this.setState({
          noteList: res.data || []
        })
      }
    })
  }

  addNote = () => {

  }
  render () {
    const { noteList } = this.state
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
          {
            noteList.length !== 0 ?
            <View className="list-item">
              <View className="list-item-left">
                <Text className="item-main">爱读书细节优化,LOGO设计</Text>
                <Text className="item-second">3月10日15：32分</Text>
              </View>
              <Text className={`iconfont iconshoucang-tianchong list-item-right ${false ? 'icon-selected' : ''}`}></Text>
            </View>
            :
            <View className="no_data_content">
              <Image src="http://39.108.232.210:9166/images/no_data.png" className="no_data"></Image>
              <Text>还没有写便签，快去写一条吧~</Text>
            </View>
          }
        </View>
        <TarBar selected="home" addNote={this.addNote}/>
      </View>
    )
  }
}

export default Home;