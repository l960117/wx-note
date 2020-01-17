import Taro, { Component } from '@tarojs/taro'
import { View, Block, Text, Image, ScrollView } from '@tarojs/components'
import TarBar from '../../components/TarBar'
import { AtTabs, AtLoadMore } from 'taro-ui'
import NoteItem from '../../components/NoteItem'
import { connect } from '@tarojs/redux'
import './index.scss'

interface findingProps {
  noteList: any
}

interface keyValueData {
  [key: string]: any
}

@connect(({ finding }: keyValueData) => ({
  noteList: finding.noteList
}))
class Finding extends Component<findingProps> {

  state = {
    current: 0,
    start: 0,
    length: 10,
    type: 'public',
    status: ''
  }

  componentDidShow () {
    this.getNoteList()
  }

  getNoteList () {
    const { dispatch } = this.props
    const { start, length, current } = this.state
    dispatch({
      type: 'finding/getNoteListAction',
      payload: {
        start,
        length,
        type: current === 0 ? 'public' : 'private',
        openid: JSON.parse(Taro.getStorageSync('key')).openid || ''
      }
    }).then(res => {
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

  addNote = () => {
    
  }

  handleClick (index) {
    this.setState({
      current: index,
      type: index === 0 ? 'public' : 'private',
      start: 0,
      length: 10
    }, () => {
      this.getNoteList()
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

  showDetail (data) {
    Taro.navigateTo({
      url: '/pages/detail/index?noteId=' + data.noteId
    })
  }

  render () {
    const { noteList } = this.props
    console.log(noteList)
    const { current, type } = this.state
    return (
      <View className="find-content">
        <AtTabs
          animated={true}
          current={current}
          tabList={[
            { title: '公开便签' },
            { title: '悄悄话' }
          ]}
          onClick={this.handleClick.bind(this)}>
        </AtTabs>
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          onScrollToLower={this.loadMore}
          lowerThreshold={20}
          >
          {
            noteList[type].list&&noteList[type].total !==0 ?
            <Block>
              {
                noteList[type].list.map((item, index) => {
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
              <Text className="no_data_text">{ type === 'public' ? '尚未找到便签，不如自己写一个~' : '尚未有悄悄话~' }</Text>
            </View>
          }
        </ScrollView>
        <TarBar selected='find' addNote={this.addNote}/>
      </View>
    )
  }
}

export default Finding;