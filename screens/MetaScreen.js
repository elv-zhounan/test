
import React, { Component, useState, useEffect, useLayoutEffect} from 'react';

import { StyleSheet, TouchableOpacity, View, Text, ScrollView,} from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import Track from '../components/Track';
const MetaScreen = ({navigation, route}) => {

    // video component setting
    const [currentTime, setCurrentTime] = useState(0.0)
    const [videoSource, setVideoSource] = useState('') // ../static/videos/EluvioLive.mp4
    const [pauseVideo, setPauseVideo] = useState(false)
    const [jump, setJump] = useState(0.0)

    // tags
    const [logo, setLogo] = useState([''])
    const [celebrity, setCelebrity] = useState([''])
    const [object, setObject] = useState([''])
    const [landmark, setLandmark] = useState([''])
    const [endtime, setEndtime] = useState([])
    
    const [_logo, set_Logo] = useState([''])
    const [_celebrity, set_Celebrity] = useState([''])
    const [_object, set_Object] = useState([''])
    const [_landmark, set_Landmark] = useState([''])
    const [_endtime, set_Endtime] = useState([])




    // call while initializing the page:
    useEffect(() => {
        setVideoSource(route.params.videoURL);
        setLogo(route.params.logo)
        setCelebrity(route.params.celebrity)
        setObject(route.params.object)
        setLandmark(route.params.landmark)
        setEndtime(route.params.endtime)
        set_Logo(route.params.logo)
        set_Celebrity(route.params.celebrity)
        set_Object(route.params.object)
        set_Landmark(route.params.landmark)
        set_Endtime(route.params.endtime)
    }, [route.params.videoURL])

    // header setting
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Meta Mode',
            headerLeft: () => (
                <View style={{merginLeft: 20}}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}} activeOpacity={0.5}>
                        <Text style={{color: 'white'}}>Back</Text>
                    </TouchableOpacity>
                </View>

            ),

            headerRight: () => (
                <View style={{merginRight: 20}}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        {/* <Avatar rounded source={require('../static/images/list.jpg')}/> */}
                        <Text style={{color: 'white'}}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )
        }); 
    });

    // signout
    const signOutUser = () => {
        setCode('');
        navigation.navigate('Home')
    }
    

    const onProgress = (time) => {
        setCurrentTime(time);
        if (Math.floor(currentTime*1000) > endtime[0]) {
            setEndtime([...endtime.slice(1, endtime.length), endtime[0]])
            setObject([...object.slice(1, object.length), object[0]])
            setLandmark([...landmark.slice(1, landmark.length), landmark[0]])
            setCelebrity([...celebrity.slice(1, celebrity.length), celebrity[0]])
            setLogo([...logo.slice(1, logo.length), logo[0]])
        }
    };

    const onSlidingComplete = (time) => {
        
        let idx = 0
        let l = _endtime.length
        while (_endtime[idx] <= time*1000){
            idx += 1;
        }
        setLogo([..._logo.slice(idx, l), ..._logo.slice(0, idx)])
        setCelebrity([..._celebrity.slice(idx, l), ..._celebrity.slice(0, idx)])
        setObject([..._object.slice(idx, l), ..._object.slice(0, idx)])
        setLandmark([..._landmark.slice(idx, l), ..._landmark.slice(0, idx)])
        setEndtime([..._endtime.slice(idx, l), ..._endtime.slice(0, idx)])

        setCurrentTime(time)
    }

    return (
        <View style = {styles.container}>
            <View style={styles.videoContainer}>
                <VideoPlayer grandPause={pauseVideo} jump={jump} videoSource={videoSource} editing={false} onProgressHandler={onProgress} onSlidingCompleteHandler={onSlidingComplete}/>
            </View>

            {/* TODO: load track */}
            <View style={styles.trackContrainer}>
                <Track 
                    celebrity={celebrity[0] === '--------' ? [] : celebrity[0].slice(0, -3).split(' & ') } 
                    logo={logo[0] === '--------' ? [] : logo[0].slice(0, -3).split(' & ') } 
                    landmark={landmark[0] === '--------' ? [] : landmark[0].slice(0, -3).split(' & ') } 
                    object={object[0] === '--------' ? [] : object[0].slice(0, -3).split(' & ') } 
                    editable={false} 
                />
            </View>

        </View>
    )
}

export default MetaScreen

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: "column",
            alignItems: 'center',
            backgroundColor: 'black'
        },
        optionContainer : {
            width: '95%',
            height: '20%',
            marginTop: 5,
            // backgroundColor: 'gray'
        },
        option: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 8,
            marginBottom: 8,
            backgroundColor: 'darkslateblue',
            borderRadius: 10,
        },
        optionButton: 
        {
            width: '40%',
            height: '80%',
            margin: 10,
            borderRadius: 10,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        inputContainer: {
            height: '8%',
            flexDirection:'column', 
            justifyContent: 'space-around', 
            alignItems: 'center', 
            marginHorizontal: 10, 
            marginVertical: 5, 
        },
        input: {
            width: '80%',
            height: '100%',
            alignContent: 'center',
            textAlign: 'center',
            backgroundColor: 'rgba(255,255,255,.8)',
            fontWeight: '400',
            color: 'black',
            fontFamily: 'Helvetica',
            fontSize: 12,
            borderRadius: 10,
            opacity: 1,
          },
        buttonConatainer: {
            width: '90%',
            height: '5%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        button: {
            borderRadius: 10,
            marginVertical: 15,
            width: '30%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,.8)',
        },
        videoContainer: {
            width: '95%', 
            height: '40%', 
            borderRadius: 10,
            alignItems: 'center', 
            backgroundColor: 'black', 
            marginTop: 5,
            flexDirection: 'column',
            justifyContent: 'center'
        },
        video: {
            alignItems: 'center',
            width: '100%',
            height: '90%'
        },
        progress: {
            flex: 1,
            width: '90%',
            flexDirection: 'row',
            borderRadius: 3,
            overflow: 'hidden',
            margin: 5
        },
        innerProgressCompleted: {
            height: 20,
            backgroundColor: '#cccccc',
        },
        innerProgressRemaining: {
            height: 20,
            backgroundColor: '#2C2C2C',
        },
        trackContrainer: {
            backgroundColor:  'black',
            height: '45%',
            width: '95%',
            margin: 10,
            borderRadius: 10,
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        
    }
)