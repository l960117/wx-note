import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import moment from 'moment'
import { staticUrl } from '../../services/config'
import './index.scss'

class NoteItem extends Component {
  static defaultProps = {
    note: {
      images: '',
      content: '',
      avatar: '',
      noteTime: '',
      nickname: ''
    }
  }
  render () {
    const { note } = this.props
    return (
      <View className='note-item'>
        {
          note&&note.images&&
          <Image src={`${staticUrl}uploads/${note.images.split('|')[0]}`} className='note-item-image' mode='widthFix'></Image>
        }
        <View className='note-item-content'>
          <Text className='note-item-content-title'>{note.content}</Text>
          <View className='note-item-content-user'>
            <Image src={note.avatar} className='note-item-content-user-avatar'></Image>
            <View className='note-item-content-user-detail'>
              <Text className='note-item-content-user-detail-name'>{note.nickname}</Text>
              <Text className='note-item-content-user-detail-time'>{moment(note.noteTime).format('YYYY-MM-DD HH:mm')}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default NoteItem