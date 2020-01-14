import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block, Image } from '@tarojs/components'
import { getNoteDetail, deleteNote } from './service'
import { staticUrl } from '../../services/config'
import './index.scss'

class Detail extends Component {

  state = {
    nickname: '',
    openid: '',
    noteId: '',
    content: '',
    images: []
  }

  componentWillMount () {
    let noteId = this.$router.params.noteId
    getNoteDetail({ noteId: noteId }).then((res) => {
      if (res.resultCode === 200) {
        this.setState({
          nickname: res.data.nickname,
          openid: res.data.openid,
          noteId: res.data.noteId,
          content: res.data.content,
          images: res.data.images.split('|')
        })
      }
    })
  }

  deleteNote () {
    const { noteId } = this.state
    deleteNote({ noteId }).then((res) => {
      if (res.resultCode === 200) {
        Taro.atMessage({
          'message': '删除成功',
          'type': 'success',
        })
        Taro.navigateBack()
      } else {
        Taro.atMessage({
          'message': '删除失败，请重试',
          'type': 'warning',
        })
      }
    })
    .catch((err) => {
      Taro.atMessage({
        'message': '系统异常，请稍后再试',
        'type': 'warning',
      })
    })
  }

  render () {
    const { nickname, content, openid, images } = this.state
    return (
      <View className='detail_content'>
        <View className='detail_top'>
          <Text className='detail_nickname'>{nickname} 的便签</Text>
          {
            openid === JSON.parse(Taro.getStorageSync('key')).openid ?
            <Block>
              <Text className='iconfont icontubiaozhizuomoban2 detail_btn'></Text>
              <Text className='iconfont iconlajitong detail_btn' onClick={this.deleteNote.bind(this)}></Text>
            </Block>
            :
            ''
          }
        </View>
        <View className='detail_center'>
          <Text className='detail_center_text'>{content}</Text>
        </View>
        {
          images.map(item => {
            return (
              <Image key={item} src={`${staticUrl}uploads/${item}`} className='detail_image'></Image>
            )
          })
        }
      </View>
    )
  }
}

export default Detail