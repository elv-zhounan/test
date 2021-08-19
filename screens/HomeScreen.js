import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, Text, Button, TextInput, SafeAreaView, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { Avatar } from 'react-native-elements';
import Modal, {SlideAnimation, ModalTitle, ModalContent, ModalPortal} from 'react-native-modals';
import CustomListItem from '../components/CustomListItem';
import VideoPlayer from '../components/VideoPlayer';

const HomeScreen = ({navigation, route}) => {

    const [duration, setDuration] = useState(0.0)
    const [currentTime, setCurrentTime] = useState(0.0)
    const [slideAnimationModal, setSlideAnimateModal] = useState(false)
    const [accessableId, setAccessableID] = useState([])
    const [pauseVideo, setPauseVideo] = useState(false)
    const [jump, setJump] = useState(0.0)

    const slideAnimationModalHandler = () => {
        setSlideAnimateModal(false)
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'EVE',
            headerLeft: () => (
                <View style={{merginLeft: 20}}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Button style={styles.button}title="login" color="white" onPress={() => {navigation.replace('Login')}}></Button>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{merginRight: 20}}>
                    <TouchableOpacity onPress={() => {setAccessableID([{cid:'id1', id: '1'}, {cid:'id2', id: '2'}, {cid:'id3', id: '3'}, {cid:'id4', id: '4'}]); setSlideAnimateModal(true)}} activeOpacity={0.5}>
                        <Avatar rounded source={require('../static/images/list.jpg')}/>
                    </TouchableOpacity>
                </View>
            )
        }); 
    });

    const onProgress = (time) => {
        setCurrentTime(time)
    }

    return (
        <View style={styles.container}>
            <View style={{width: '100%', height: '100%', alignItems: 'center', backgroundColor: 'black'}}>
                <VideoPlayer grandPause={pauseVideo} jump={jump} editing={false}  videoSource='../static/videos/EluvioLive.mp4' onProgressHandler={onProgress}/>
            </View>
            
            
            <Modal
                onDismiss={slideAnimationModalHandler}
                onTouchOutside={slideAnimationModalHandler}
                swipeDirection="down"
                onSwipeOut={slideAnimationModalHandler}
                visible={slideAnimationModal}
                modalTitle={ <ModalTitle title="accessable content" hasTitleBar={false} /> }
                modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
            >
                <ModalContent>
                    <SafeAreaView style={{height: '60%'}}>
                        <ScrollView>
                            {
                                accessableId.map((content) => (
                                    <TouchableOpacity style={{width: '90%'}}>
                                        <CustomListItem id={content.id} cid={content.cid}/>
                                    </TouchableOpacity>
                                    
                                ))
                            }
                        </ScrollView>
                    </SafeAreaView>
                </ModalContent>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        backgroundColor: 'black'
      },
    inputContainer: {
        width: '90%',
        alignItems: 'center'
    },
    input: {
        width: '90%', 
        borderBottomColor: 'black', 
        borderBottomWidth: 1, 
        padding:10,
        marginBottom: 10
    },
    videoContainer: {
        alignItems: 'center',
        width: '100%',
        height: '80%'
    },
    button: {
        width: 200,
        margin: 30
    },
    controls: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
   
})

export default HomeScreen
