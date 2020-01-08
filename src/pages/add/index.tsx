import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTextarea, AtImagePicker, AtModal, AtMessage, AtModalContent } from 'taro-ui'
import { baseUrl, staticUrl } from '../../services/config'
import addNote from './service'
import './index.scss'

class Add extends Component {

  config: Config = {
    navigationBarTitleText: '发布便签'
  }
  state = {
    content: '',
    files: [],
    color: '#ff5958',
    uploadImageName: [],
    isShowModal: false
  }

  handleChange (e) {
    this.setState({
      content: e.target.value
    })
  }

  changeFiles (files) {
    console.log(files)
    this.setState({
      files
    })
  }
  onFail (mes) {
    console.log(mes)
  }
  onImageClick (index, file) {
    console.log(index, file)
  }
  checkColor (color) {
    this.setState({
      color
    })
  }

  addNote () {
    const { files, content } = this.state
    if (content)
      this.setState({
        isShowModal: true
      })
      if (files.length === 0) {
        this.submitNoteData()
      } else {
        this.uploadLoader({baseUrl,path:files}, this.submitNoteData)
      }
  }

  uploadLoader (data, callback) {
    let that = this
    let i = data.i ? data.i : 0
    let success=data.success?data.success:0
    let fail=data.fail?data.fail:0
    Taro.uploadFile({
      url:data.baseUrl+'/note/upload',
      header:{
        'content-type': 'multipart/form-data',
        'cookie':'token='
      },
      name:'file',
      filePath:data.path[i].url,
      success: (resp) => {
        let result= JSON.parse(resp.data)
        if (result.resultCode === 200) {
          success++;
          this.setState((prevState)=>{
            let oldUploadImageName = prevState.uploadImageName
            oldUploadImageName.push(result.data.fileName)
            return({
              uploadImageName:oldUploadImageName
            })
          }, () => {
            if ((success + fail) == data.path.length) {
              callback()
            }
          })
        } else {
          fail++
        }
      },
      fail: () => {
        fail++
      },
      complete: () => {
        i++;
        if(i==data.path.length){
        }else{
          data.i=i
          data.success=success
          data.fail=fail
          that.uploadLoader(data, this.submitNoteData)
        }
      }
    })
  }

  submitNoteData = () => {
    const { content, color, uploadImageName } = this.state
    let params = {
      openid: JSON.parse(Taro.getStorageSync('key')).openid || '',
      content,
      color,
      images: uploadImageName.join('|'),
      editOpenid: JSON.parse(Taro.getStorageSync('key')).openid || '',
      type: 'public'
    }
    addNote(params).then((res) => {
      this.setState({
        isShowModal: false
      })
      if (res.resultCode === 200) {
        Taro.atMessage({
          'message': '发布成功',
          'type': 'success',
        })
        Taro.navigateBack()
      } else {
        Taro.atMessage({
          'message': '发布失败，请重试',
          'type': 'warning',
        })
      }
    })
    .catch((res) => {
      this.setState({
        isShowModal: false
      })
      Taro.atMessage({
        'message': '发布失败，请重试',
        'type': 'warning',
      })
    })
  }
  render () {
    const { color, isShowModal } = this.state
    return (
      <View className='add_content'>
        <View className='add_top'>
          <Text className='add_nickname'>Summer 的便签</Text>
          <Text className='iconfont iconicon_oversea_actions ok_btn' onClick={this.addNote.bind(this)}></Text>
        </View>
        <View className='add_center'>
          <AtTextarea
            count={false}
            value={this.state.content}
            onChange={this.handleChange.bind(this)}
            maxLength={200}
            placeholder='此时此刻你想写点什么~'
          />
          <AtImagePicker
            multiple
            showAddBtn={this.state.files.length < 9}
            count={9}
            files={this.state.files}
            onChange={this.changeFiles.bind(this)}
            onFail={this.onFail.bind(this)}
            onImageClick={this.onImageClick.bind(this)}
          />
        </View>
        <View className='add_view_line'></View>
        <View className='add_view_color'>
          <Text className='add_view_color_text'>便签颜色</Text>
          <View className='add_view_color_list'>
            <Text className={`${color === '#ff5958' ? 'iconfont icontiaokuanxuanzhong-':'iconfont icontiaokuanweixuanzhong-'} color_1 color`} onClick={this.checkColor.bind(this, '#ff5958')}></Text>
            <Text className={`${color === '#609dff' ? 'iconfont icontiaokuanxuanzhong-':'iconfont icontiaokuanweixuanzhong-'} color_2 color`} onClick={this.checkColor.bind(this, '#609dff')}></Text>
            <Text className={`${color === '#ffb849' ? 'iconfont icontiaokuanxuanzhong-':'iconfont icontiaokuanweixuanzhong-'} color_3 color`} onClick={this.checkColor.bind(this, '#ffb849')}></Text>
            <Text className={`${color === '#7a88ff' ? 'iconfont icontiaokuanxuanzhong-':'iconfont icontiaokuanweixuanzhong-'} color_4 color`} onClick={this.checkColor.bind(this, '#7a88ff')}></Text>
            <Text className={`${color === '#ffa5eb' ? 'iconfont icontiaokuanxuanzhong-':'iconfont icontiaokuanweixuanzhong-'} color_5 color`} onClick={this.checkColor.bind(this, '#ffa5eb')}></Text>
          </View>
        </View>
        <AtModal isOpened={isShowModal} closeOnClickOverlay={false}>
          <AtModalContent>
            <View className='loading-content'>
              <Image src={`${staticUrl}images/loading.gif`} className='loading-image'></Image>
            </View>
          </AtModalContent>
        </AtModal>
        <AtMessage />
      </View>
    )
  }
}

export default Add