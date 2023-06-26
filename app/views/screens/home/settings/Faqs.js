import React, { Fragment, useEffect, useRef, useState } from 'react'
import { RefreshControl, Text } from 'react-native'
import { View } from 'react-native'
import { FlatList } from 'react-native'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { candidateFaqs } from '../../../../json/candidateFaqs'
import { getFaqs, setFaqs } from '../../../../redux/actions/homeActions'
import { fonts } from '../../../../values/fonts'
import InputView from '../../../components/InputView'
import BaseView from '../../../hoc/BaseView'
import FaqItem from '../../../items/FaqItem'

const Faqs = props => {

    const baseViewRef = useRef(null)

    const dispatch = useDispatch();

    const faqs = useSelector(state => state.home.faqs);
    const personalInfo = useSelector(state => state.profile.profilePersonalInfo);

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [faqList, setFaqList] = useState([])


    useEffect(() => {
        _getFaqs()
      return () => {
        
      };
    }, [])

    const _getFaqs = () => {
        setIsRefreshing(true)
        setTimeout(() => {
            setIsRefreshing(false)
            setFaqList(candidateFaqs)
            dispatch(setFaqs(candidateFaqs))
        }, 2000);
        // getFaqs()
        //     .then(response => {
        //         setIsRefreshing(false)
        //         console.log('[Faqs.js] response : ',response)
        //         response.forEach(it => it.isCollapsed = true)
        //         dispatch(setFaqs(response))
        //         setFaqList(response)
        //     })
        //     .catch(error => {
        //         setIsRefreshing(false)
        //         console.log('[Faqs.js] response : ',error)
        //     })
    }

    const _renderItem = ({item,index}) => {
        return (
            <FaqItem 
                item={item}
                index={index}
            />
        )
    }

    
    const _onSearchText = (text) => {
        setSearchText(text)
        const newData = faqs.filter(item => {
            if(Object.entries(item).length != 0  &&  item !== null){
              const itemData = `${item.Title.toUpperCase()}`;
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            }
          })
          if (text != null) {
            setFaqList(newData)
          } else if (text == "") {
            setFaqList([])
          }
    }




    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle='FAQs'
            navigation={props.navigation}
            hasNotification
            hasTitle
        >
        <View
            style={styles.parent}
        >
            {
                personalInfo!=null &&
                <Text style={styles.title}>Hello, {personalInfo.firstName} {personalInfo.lastName}</Text>
            }
            <Text style={styles.info}>What can we help you with today?</Text>
            <InputView 
                placeholder={'Search Support'}
                value={searchText}
                onChangeText={text => _onSearchText(text)}
            />
            <FlatList 
                data={faqList}
                renderItem={_renderItem}
                style={{paddingTop:16}}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl 
                        refreshing={isRefreshing}
                        onRefresh={() => _getFaqs()}
                    />
                }
                contentContainerStyle={{paddingBottom:48}}
            />
        </View>
        </BaseView>
    )
}

export default Faqs

const styles = StyleSheet.create({
    parent : {
        flex:1,
        paddingHorizontal:16,
        paddingTop:16,

    },
    topMargin : {
        marginTop:16
    },
    title : {
        fontSize:20,
        fontFamily:fonts.notoSansMedium,
    },
    info : {
        fontSize:16,
        fontFamily:fonts.notoSansBold,
        paddingBottom:8
    }
})
