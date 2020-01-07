import Taro, { Component } from '@tarojs/taro'
import { View, Navigator, Block, Text, Image } from '@tarojs/components'
import './index.scss'
import note1 from '../../assets/images/note_1.png'
import note2 from '../../assets/images/note_2.png'
import find1 from '../../assets/images/find_1.png'
import find2 from '../../assets/images/find_2.png'
import noteAdd from '../../assets/images/note_add.png'

const tarbar = {
  "background": {
    "backgroundColor": "#ffffff"
  },
  "colorSty": {
    "color": "#8d989c",
    "selectedColor": "#509aff",
  },
  "list": [
    {
      "pagePath": "/pages/home/index",
      "text": "便签",
      "isSpecial": false,
      "iconPath": note2,
      "selectedPath": note1,
      "key": "home"
    },
    {
      "pagePath": "/pages/add/index",
      "text": "",
      "isSpecial": true,
      "iconPath": noteAdd
    },
    {
      "pagePath": "/pages/finding/index",
      "text": "发现",
      "isSpecial": false,
      "iconPath": find2,
      "selectedPath": find1,
      "key": "find"
    }
  ]
}

interface TarBarProps {
  selected: string;
  addNote: () => void;
}

class TarBar extends Component<TarBarProps> {

  addNote = () => {
    Taro.navigateTo({
      url: '/pages/add/index'
    })
  }

  render () {

    const { selected } = this.props
    return (
      <View className="tabbar_box" style={tarbar.background}>
        {
          tarbar.list.map(item => {
            return (
              <Block>
              {
                item.isSpecial ? 
                <View className="tabbar_nav" hover-class="none" style={tarbar.colorSty} onClick={this.addNote}>
                  <View className='special-wrapper'>
                    <Image className="tabbar_icon" src={item.iconPath}></Image>
                  </View>
                </View>
                :
                <Navigator className="tabbar_nav" hover-class="none" url={item.pagePath} data-url={item.pagePath} style={{'color': item.key === selected ? tarbar.colorSty.selectedColor : tarbar.colorSty.color}} open-type="switchTab">
                  <Image className="tabbar_icon" src={item.key === selected ? item.selectedPath : item.iconPath}></Image>
                  <Text>{item.text}</Text>
                </Navigator>
              }
              </Block>
            )
          })
        }
        <View>

        </View>
      </View>
    )
  }
}

export default TarBar