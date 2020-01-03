import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import moment from 'moment'

class NoteItem extends Component {
  static defaultProps = {
    note: {
      images: [],
      content: '4324324324324324325435435435435435435435',
      avatar: 'https://wx.qlogo.cn/mmopen/vi_32/jAfAmXlbINDicN61ibMmCI0E7oF8bgvnsH5CribqwEgjXAurT9HZriao0abPiad9QsOWuugzPeb5q9BDjzoJrK2sKNQ/132',
      noteTime: '2016-10-12 15:30',
      nickname: 'Summer'
    }
  }
  render () {
    const { note } = this.props
    return (
      <View className='note-item'>
        {
          note&&note.images&&note.images[0]&&
          <Image src={note.images[0]} className='note-item-image'></Image>
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