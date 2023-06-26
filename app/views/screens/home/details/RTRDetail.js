import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { acceptRTR, rejectRTR } from '../../../../redux/actions/homeActions'
import { dateFormatWithDDMonthYYYY, getDiffInDaysFromToday } from '../../../../utils/DateTimeValidations'
import { showAlert, showChoiceAlert, showConfirmAlert } from '../../../../utils/Message'
import { fonts } from '../../../../values/fonts'
import AcceptRejectButtons from '../../../components/AcceptRejectButtons'
import BaseView from '../../../hoc/BaseView'
import ItemView from './items/ItemView'
import JobDetailBottomView from './items/JobDetailBottomView'
import JobDetailItem from './items/JobDetailItem'
import RTRDetailBottomIcons from './items/RTRDetailBottomIcons'
import RequestedRTR from './RequestedRTR'

const RTRDetail = props => {

    const baseViewRef = useRef(null)

    const [rtrDetail, setRtrDetail] = useState(null)
    const userPrefs = useSelector(state => state.login.userPrefs)
    const profilePersonalInfo = useSelector(state => state.profile.profilePersonalInfo)

    useEffect(() => {
        init()
      return () => {
        
      };
    }, [])

    
    const init = () => {
        const {detail} = props.route.params;

        console.log('[RTRDetail.js] init : ',detail)
        if(detail !== undefined) {
            setRtrDetail(detail)
        }
    }

    


    const _onAccept = () => {
        showConfirmAlert(
            'Accept',
            "Have you read the RTR? \nWant to Accept this?",
            () => {
                if(baseViewRef !== null){

                    const address = profilePersonalInfo.address;

                    const recruiterName = rtrDetail.recruiterName.split(' ')

                    const data = {
                        "mapperId": rtrDetail.mapperId,
                        "candidateData": {
                            "candidateId": userPrefs.candidateId,
                            "candidateLocation": `${address.addressLine1} `,
                            "candidateFname": profilePersonalInfo.firstName,
                            "candidateLname": profilePersonalInfo.lastName,
                            "candidateEmail": profilePersonalInfo.email
                        },
                        "recruiterData": {
                            "recruiterTenant": rtrDetail.recruiterTenant,
                            "recruiterEmail": rtrDetail.recruiterEmail,
                            "firstName": recruiterName.length > 0 ? recruiterName[0] : '',
                            "lastName": recruiterName.length > 1 ? recruiterName[1] : '',
                        },
                        "jobData": {
                            "jobId": rtrDetail.jobId,
                            "jobTitle": rtrDetail.jobTitle,
                            "jobTenant": rtrDetail.jobTenant,
                        }
            
                    }

                    console.log('[RTRDetail.js] On Accept : ',userPrefs,rtrDetail)
                    baseViewRef.current.showLoader();
                    acceptRTR(data)
                        .then(response => {
                            baseViewRef.current.hideLoader();
                            console.log('[RTRDetail.js] on Accept : ',response)
                            setTimeout(() => {
                                baseViewRef.current.successModal.baseModal.showModal()
                                baseViewRef.current.successModal.init('RTR Accepted!',``)
                            })
                        })
                        .catch(error => {
                            baseViewRef.current.hideLoader();
                            console.log('[RTRDetail.js] on Accept Error: ',error)
                        })
                }
            }
        )
    }

    const _onReject = () => {
        showConfirmAlert(
                'Reject',
                'Are you sure you want to reject?',
                () => {
                    if(baseViewRef !== null){

                        const address = profilePersonalInfo.address;
    
                        const recruiterName = rtrDetail.recruiterName.split(' ')
    
                        const data = {
                            "mapperId": rtrDetail.mapperId,
                            "candidateData": {
                                "candidateId": userPrefs.candidateId,
                                "candidateLocation": `${address.addressLine1} `,
                                "candidateFname": profilePersonalInfo.firstName,
                                "candidateLname": profilePersonalInfo.lastName,
                                "candidateEmail": profilePersonalInfo.email
                            },
                            "recruiterData": {
                                "recruiterTenant": rtrDetail.recruiterTenant,
                                "recruiterEmail": rtrDetail.recruiterEmail,
                                "firstName": recruiterName.length > 0 ? recruiterName[0] : '',
                                "lastName": recruiterName.length > 1 ? recruiterName[1] : '',
                            },
                            "jobData": {
                                "jobId": rtrDetail.jobId,
                                "jobTitle": rtrDetail.jobTitle,
                                "jobTenant": rtrDetail.jobTenant,
                            }
                
                        }
    
                        console.log('[RTRDetail.js] On Reject : ',data)
                        baseViewRef.current.showLoader();
                        rejectRTR(data)
                            .then(response => {
                                baseViewRef.current.hideLoader();
                                console.log('[RTRDetail.js] on Reject : ',response)
                                showAlert('success','RTR Rejected!')
                            })
                            .catch(error => {
                                baseViewRef.current.hideLoader();
                                console.log('[RTRDetail.js] on Reject Error: ',error)
                            })
                    }
                }
            )
    }


    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle='RTR'
            navigation={props.navigation}
            hasNotification
            headerParentStyle={{borderBottomLeftRadius:0,borderBottomRightRadius:0}}
        >
        {/* {
            rtrDetail !== null 
            &&
            rtrDetail.statusName !== 'Sourced' &&
            <View></View>
        } */}

        {
            (rtrDetail !== null && rtrDetail.statusName === 'Sourced') &&
            <RequestedRTR 
                rtrDetail={rtrDetail}
                onAccept={() => _onAccept()}
                onReject = {() => _onReject()}
            />
        }

        </BaseView>
    )
}

export default RTRDetail


