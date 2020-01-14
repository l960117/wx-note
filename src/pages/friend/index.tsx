import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, Block, Image, Button } from '@tarojs/components'
import NoteItem from '../../components/NoteItem'
import { AtLoadMore } from 'taro-ui'
import { connect } from '@tarojs/redux'
import './index.scss'

interface FriendProps {
  nickname: string;
  total: number;
  noteList: [];
}
@connect(({ friend }) => ({
  noteList: friend.noteList,
  nickname: friend.nickname,
  total: friend.total
}))
class Friend extends Component<FriendProps> {

  state = {
    status: '',
    start: 0,
    length: 10,
    openid: ''
  }

  componentWillMount () {
    const { dispatch } = this.props
    this.setState({
      openid: this.$router.params.openid
    }, () => {
      const { openid } = this.state
      dispatch({
        type: 'friend/getUserNoteInfoAction',
        payload: {
          openid: openid
        }
      })
      this.getNoteList()
    })
  }

  getNoteList = () => {
    const { dispatch } = this.props
    const { start, length, openid } = this.state
    dispatch({
      type: 'friend/getFriendNoteAction',
      payload: {
        openid: openid,
        start: start,
        length: length
      }
    }).then((res) => {
      if (res.resultCode === 200) {
        if (res.data.results.length < 10) {
          this.setState({
            status: 'noMore'
          })
        } else {
          this.setState({
            status: ''
          })
        }
      }
    })
  }

  loadMore = () => {
    if (this.state.status === 'noMore') return
    this.setState({
      status: 'loading',
      start: this.state.start + this.state.length
    }, () => {
      this.getNoteList()
    })
  }

  AddPrivateNote () {
    const { openid } = this.state
    Taro.navigateTo({
      url: '/pages/add/index?type=private&openid=' + openid
    })
  }

  showDetail (data) {
    Taro.navigateTo({
      url: '/pages/detail/index?noteId=' + data.noteId
    })
  }

  render () {
    const { nickname, total, noteList } = this.props
    return (
      <View className="friend-content">
        <View className="friend-top">
          <View className="friend-name">
            <Text className="friend-nickname">{nickname}</Text>
          </View>
          <View className="friend-count">
            <View className="friend-count-title1">
              <Text>便签数</Text>
            </View>
            <View className="friend-count-weight">
              <Text className="friend-count-number">{total}</Text>
              <Text className="friend-count-after">个</Text>
            </View>
          </View>
        </View>
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          onScrollToLower={this.loadMore}
          lowerThreshold={20}
          >
          <View className="friend-list">
            <View className="note-btn" onClick={this.AddPrivateNote.bind(this)}>留悄悄话</View>
            {
              noteList.length !== 0 ?
              <Block>
                {
                  noteList.map((item, index) => {
                    return (
                      <View key={index} className="note-item" onClick={this.showDetail.bind(this, item)}>
                        <NoteItem note={item}></NoteItem>
                      </View>
                    )
                  })
                }
                <AtLoadMore
                  status={this.state.status}
                  noMoreText="未找到更多便签"
                  loadingText=''
                />
              </Block>
              :
              <View className="no_data_content">
                <Image src="http://39.108.232.210:9166/images/no_data.png" className="no_data"></Image>
                <Text className="no_data_text">暂未找到标签~</Text>
              </View>
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Friend