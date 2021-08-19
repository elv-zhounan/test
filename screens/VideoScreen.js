
import React, { Component, useState, useEffect, useLayoutEffect} from 'react';

import { StyleSheet, ext, TouchableOpacity, View, Text, Button, TextInput, ScrollView, SafeAreaView} from 'react-native';
import { Avatar } from 'react-native-elements';
import Modal, {SlideAnimation, ModalTitle, ModalContent, ModalPortal} from 'react-native-modals';
import CustomListItem from '../components/CustomListItem';
import {ElvClient} from '../ElvClient-min'
import VideoPlayer from '../components/VideoPlayer';
import InfoInput from '../components/InfoInput';
const VideoScreen = ({navigation, route}) => {
    
    // identity
    const [code, setCode] = useState('')
    const [accessableId, setAccessableID] = useState([])

    // video component setting
    const [loading, setLoading] = useState(false)
    const [videoSource, setVideoSource] = useState('') // ../static/videos/EluvioLive.mp4
    const [currentTime, setCurrentTime] = useState(0.0)
    const [pauseVideo, setPauseVideo] = useState(false)
    const [jump, setJump] = useState(-1)

    // tags
    const [logo, setLogo] = useState([''])
    const [celebrity, setCelebrity] = useState([''])
    const [object, setObject] = useState([''])
    const [landmark, setLandmark] = useState([''])
    const [endtime, setEndtime] = useState([])
    
    
    // slide window modal
    const [slideAnimationModal, setSlideAnimateModal] = useState(false)
    const slideAnimationModalHandler = () => {setSlideAnimateModal(false)}

    // useEffect to set the private key
    useEffect(() => {
        setCode(route.params.code)
    }, [route.params.code])

    // header setting
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'EVE',
            headerLeft: () => (
                <View style={{merginLeft: 20}}>
                    <TouchableOpacity onPress={() => setSlideAnimateModal(true)} activeOpacity={0.5}>
                        <Avatar rounded source={require('../static/images/smallLogo.jpg')}/>
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
        

    const loadTags = async (client, lid, cid) => {
        const videoTags = await client.ContentObjectMetadata({
            libraryId: lid,
            objectId: cid,
            metadataSubtree: "video_tags",
        });
        console.log('logo detection', videoTags.summary.logo_detection);
        console.log('celebrity detection', videoTags.summary.celebrity_detection);
        console.log('object detection', videoTags.summary.object_detection);
        console.log('landmark recognition', videoTags.summary.landmark_recognition);

        const obj = await loadMetadataTags(client, videoTags, lid, cid);
        map = obj.map
        clips = obj.clips
        // console.log(map)
        // console.log(clips)
        setEndtime(clips)
        setCelebrity(map['Celebrity Detection'])
        setObject(map['Object Detection'])
        setLandmark(map['Landmark Recognition'])
        setLogo(map["Logo Detection"])
        console.log(endtime.length, celebrity.length, object.length, landmark.length, logo.length)
    }

    const loadMetadataTags = async (client, videoTags, lid, cid) => {
        const metadataTags = videoTags.metadata_tags
    
        console.log("Summarizing video tags...");
        var celebrityTags = [];
        var landmarkTags = [];
        var logoTags = [];
        var objectTags = [];
        const map = {
            "Object Detection": objectTags,
            "Celebrity Detection": celebrityTags,
            "Landmark Recognition": landmarkTags,
            "Logo Detection": logoTags,
        }
        const clips = [];
        for (var k in metadataTags) {
            if (k.length!=4) {continue;}
            const tags = await client.ContentObjectMetadata({
                libraryId: lid,
                objectId: cid,
                metadataSubtree: "video_tags/metadata_tags/" + k + "/metadata_tags/shot_tags/tags"
            })
            
            // each tag in the tags has its own start time and end time;
            // each detected label in a tag also has it's own start-time and end-time;
            // sometimes, they are not with the relationship that [s1, e1], [s2, e2], s1 < s2 and e1  >e2. 
            // for example: clip start: 29112   clip end: 33575     [{"end_time": 37329, "start_time": 31031, "text": ["Man"]}]

            // go through each clip
            for (var i = 0; i < tags.length; i++) {
                start = tags[i]['start_time']
                end = tags[i]['end_time']
                clips.push(end)
                
                
                // go through each feature at this clip
                for (var feature in map) {
                    if (!(feature in tags[i]["text"])) {
                        map[feature].push('--------');
                    }
                    else{
                        console.log('clip start:', start, '  clip end:', end, '   ', tags[i]["text"][feature])
                        let featureStr = '';
                        var featureTags = tags[i]["text"][feature];
                        for (var j = 0; j < featureTags.length; j++) {
                            var textList = featureTags[j]["text"]
                            for (var jt = 0; jt < textList.length; jt++) {
                                featureStr += textList[jt] + ' & '
                                
                            };
                        };
                        map[feature].push(featureStr === '' ? '--------': featureStr);
                    }
                    
                }
            }
        }
        return {'map': map, 'clips': clips}
    }
    const load = async (id, libId, cfg, player, protocol, drm ) => {
        setAccessableID([{cid:'id1', id: '1'}, {cid:'id2', id: '2'}, {cid:'id3', id: '3'}, {cid:'id4', id: '4'}])
        setLoading(true)
        try {
            const objectId = id.startsWith("iq__") ? id : "";
            const versionHash = id.startsWith("hq__") ? id : "";

            const client = await ElvClient.FromConfigurationUrl({configUrl: cfg});
            
            const wallet = client.GenerateWallet();
            const signer = wallet.AddAccount({privateKey: code});
            await client.SetSigner({signer});
            // console.log(client)

            // const playoutOptions = await client.PlayoutOptions({objectId, versionHash, protocols: [protocol], drms: [drm] });
            
            let playoutOptions;
            if(player === "BitMovin") {
                
                // playoutOptions = await client.BitmovinPlayoutOptions({ objectId, versionHash, protocols: [protocol], drms: [drm] });
                // LoadBitmovin(playoutOptions);
            } 
            else {
                

                playoutOptions = await client.PlayoutOptions({ objectId, versionHash, protocols: [protocol], drms: [drm]});

                let playoutMethods = playoutOptions[protocol].playoutMethods
                let playoutInfo = playoutMethods[drm]
                let playoutUrl = playoutInfo.playoutUrl
                // console.log(playoutUrl);
                setVideoSource(playoutUrl);

                loadTags(client, libId, id)
            }
        }
        catch(error) {
            console.error(error);
        }
        setLoading(false)
    }

    const onProgress = (time) => {
        setCurrentTime(time)
    }

    return (
        <View style = {styles.container}>
            <View style={{height: '20%', width: '100%'}}>
                <InfoInput onload={load} />
            </View>
            
            
            {loading? (<View><Text style={{color: 'white'}}>loading</Text></View>):<View></View>}

            <View style={styles.videoContainer}>
                <VideoPlayer grandPause={pauseVideo} jump={jump} videoSource={videoSource} editing={false}  onProgressHandler={onProgress}/>
            </View>

            

            {/* meta and edit button  */}
            <View style={styles.buttonConatainer}>
                <TouchableOpacity style={styles.button} onPress = {() => {navigation.navigate('Meta', {videoURL:videoSource, logo: logo, celebrity: celebrity, landmark: landmark, object: object, endtime: endtime})}}>
                    <Text color='darkslateblue'>meta</Text>
                </TouchableOpacity>
                
                
                <TouchableOpacity style={styles.button} onPress = {() => {navigation.navigate('Edit', {videoURL:videoSource, logo: logo, celebrity: celebrity, landmark: landmark, object: object, endtime: endtime})}}>
                    <Text color='darkslateblue'>edit</Text>
                </TouchableOpacity>
            </View>


            {/* slide up window */}
            <Modal
                onDismiss={slideAnimationModalHandler}
                onTouchOutside={slideAnimationModalHandler}
                swipeDirection="down"
                onSwipeOut={slideAnimationModalHandler}
                visible={slideAnimationModal}
                modalTitle={ <ModalTitle title="accessable content" hasTitleBar={false} /> }
                modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
            >
                {/* <ModalContent> */}
                <SafeAreaView style={{height: '70%', width: '100%'}}>
                    <ScrollView>
                        <View style={{flexDirection: 'column', justifyContent: 'space-around', alignContent: 'center'}}>
                            {
                                accessableId.map((content) => (
                                    <TouchableOpacity >
                                        <CustomListItem id={content.id} cid={content.cid}/>
                                    </TouchableOpacity>
                                    
                                ))
                            }
                        </View>
                        
                    </ScrollView>
                </SafeAreaView>
                {/* </ModalContent> */}
            </Modal>
        </View>
    )
}

export default VideoScreen

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: "column",
            alignItems: 'center',
            backgroundColor: 'black'
        },
        buttonConatainer: {
            width: '90%',
            height: '10%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        button: {
            borderRadius: 10,
            marginBottom: 15,
            width: '30%',
            height: '50%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,.8)',
        },
        videoContainer: {
            width: '95%', 
            height: '65%', 
            borderRadius: 10,
            alignItems: 'center', 
            backgroundColor: 'black', 
            marginTop: 5,
            flexDirection: 'column',
            justifyContent: 'center'
        },
        
        
    }
)