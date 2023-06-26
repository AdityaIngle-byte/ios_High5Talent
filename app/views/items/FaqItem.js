import { StyleSheet, Text, View } from 'react-native'
import React, { Fragment, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { fonts } from '../../values/fonts';
import { colors } from '../../values/colors';
import Collapsible from 'react-native-collapsible';
import WebView from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import { SCREEN_WIDTH } from '../../values/dimens';
import { Image } from 'react-native';
import { FlatList } from 'react-native';


const FaqItem = props => {
    const {item,index} = props;

    const [isCollapsed, setIsCollapsed] = useState(true)
    // const image = JSON.parse(item.ImageURL);
    // console.log('[FaqItem.js] it : ',image)


    const _renderItem = ({item,index}) => {
      return (
        <Image 
            source={item}
            style={{height:360,width:SCREEN_WIDTH/2}}
            resizeMode='contain'
        />
      )
    }

  return (
    <View>
      <TouchableOpacity onPress={() => setIsCollapsed(prevState => !prevState)}>
      <View style={styles.row}>
        <Text style={styles.title}>{index+1}. {item.Title}</Text>
        <Icon 
            name={!isCollapsed ? 'chevron-down' : 'chevron-right'}
            type={'feather'}
        />
      </View>
      </TouchableOpacity>

      <Collapsible collapsed={isCollapsed}>
        <RenderHtml
            contentWidth={'100%'}
            source={{html : item.Content}}
        />
        {
          item.ImageURL !== undefined &&
            <Fragment>
                <Text style={[styles.title,{color:colors.defaultTextColor,marginBottom:8}]}>Uploaded Images</Text>
                {/* <Image 
                    source={{uri : image[0].ImageURL}}
                    style={{height:240,width:'100%'}}
                    resizeMode='contain'
                /> */}
                <FlatList 
                  data={item.ImageURL}
                  renderItem={_renderItem}
                  horizontal
                />
            </Fragment>
        }

        {/* <Text>{item.Content}</Text> */}
      </Collapsible>
    </View>
  )
}

export default FaqItem

const styles = StyleSheet.create({
    parent : {

    },
    row : {
        flexDirection : 'row',
        alignItems:'center',
        marginTop:16
    },
    title : {
        fontFamily:fonts.notoSansBold,
        fontSize : 16,
        color : colors.primary,
        flex:1
    }
})