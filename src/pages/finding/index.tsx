import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import TarBar from '../../components/TarBar'

class Finding extends Component {

  componentWillMount () {
    console.log(4444)
  }

  addNote = () => {
    
  }
  render () {
    return (
      <View>
        <TarBar selected="find" addNote={this.addNote}/>
      </View>
    )
  }
}

export default Finding;