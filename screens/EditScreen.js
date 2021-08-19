
import React, {useState, useEffect, useLayoutEffect} from 'react';

import { StyleSheet, TouchableOpacity, View, Text, ScrollView,} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import GrandButton from '../components/GrandButton';
import VideoPlayer from '../components/VideoPlayer';
import MetaTrack from '../components/Track';
import Thumbnails from '../components/Thumbnails';
import CustomMarker from '../components/CustomMarker';
const MetaScreen = ({navigation, route}) => {

    // video component setting
    const [currentTime, setCurrentTime] = useState(0.0)
    const [videoSource, setVideoSource] = useState('') // ../static/videos/EluvioLive.mp4
    const [jump, setJump] = useState(0.0)
    const [pauseVideo, setPauseVideo] = useState(false)
    
    // const [grandPause]

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

    // saved clips
    const [clips, setClips] = useState([])
    const [clipStart, setClipStart] = useState(0)
    const [editingClip, setEditingClip] = useState({})
    const [clipsNum, setClipsNum] = useState(0)

    // editing
    const [editing, setEditing] = useState(false)
    const [sliderStart, setSliderStart] = useState(0.0)
    const [sliderEnd, setSliderEnd] = useState(0.0)


    const pressIn = () => {
        setClipStart(currentTime)
    }
    
    const pressOut = () => {
        if ((currentTime - clipStart) > 1){
            
            let temp_clips = [...clips, {start: clipStart.toFixed(2), end: currentTime.toFixed(2), idx: clipsNum}]
            temp_clips.sort(function (a, b){
                if (a.idx > b.idx){
                    return 1
                }else{
                    return -1
                }
            })
            setClips(temp_clips)
            setClipsNum(clipsNum+1)
            console.log(clips)
        }
            
        setClipStart(0)
    }

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
            title: 'Edit Mode',
            headerLeft: () => (
                <View style={{merginLeft: 20}}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}} activeOpacity={0.5}>
                        <Text style={{color: 'white'}}>Back</Text>
                    </TouchableOpacity>
                </View>

            ),

        }); 
    });


    const updateTrack = (time) => {
        
        let idx = 0
        let l = _endtime.length
        while (_endtime[idx] < time*1000){
            idx += 1;
        }
        setLogo([..._logo.slice(idx, l), ..._logo.slice(0, idx)])
        setCelebrity([..._celebrity.slice(idx, l), ..._celebrity.slice(0, idx)])
        setObject([..._object.slice(idx, l), ..._object.slice(0, idx)])
        setLandmark([..._landmark.slice(idx, l), ..._landmark.slice(0, idx)])
        setEndtime([..._endtime.slice(idx, l), ..._endtime.slice(0, idx)])

    }

    const onProgress = (time, ref) => {
        setCurrentTime(time);
        if (Math.floor(time*1000) > endtime[0]) {
            setEndtime([...endtime.slice(1, endtime.length), endtime[0]])
            setObject([...object.slice(1, object.length), object[0]])
            setLandmark([...landmark.slice(1, landmark.length), landmark[0]])
            setCelebrity([...celebrity.slice(1, celebrity.length), celebrity[0]])
            setLogo([...logo.slice(1, logo.length), logo[0]])
        }

        if(editing){
            if(time > editingClip.end){
                ref.current.seek(parseFloat(editingClip.start))
            }
        }

    };

    const onSlidingComplete = (time) => {
        updateTrack(time)
    }

    const onThumbnailPress = (clip) => {
        let start = parseFloat(clip.start)
        let end = parseFloat(clip.end)
        setSliderEnd(end)
        setSliderStart(start)

        setEditing(true)
        setEditingClip(clip)
        updateTrack(start)
        setJump(start)
    }
    
    const updateClips = (clip)=> {
        if ((parseFloat(clip.end) - parseFloat(clip.start)) > 1){

            first_half = clip.idx > 0 ? clips.slice(0, clip.idx): []
            second_half = clip.idx < clipsNum ? clips.slice(clip.idx+1, clips.length): []
            console.log(first_half)
            console.log(second_half)
            let temp_clips = [...first_half, ...second_half, {start: clip.start, end: clip.end, idx: clip.idx}]
            console.log(temp_clips)

            temp_clips.sort(function (a, b){
                if (a.idx > b.idx){
                    return 1
                }else{
                    return -1
                }
            })
            setClips(temp_clips)
            setClipStart(0)
            setEditing(false)
        }
            
        
    }
    return (
        <View style = {styles.container}>
            {
                editing?
                <View style={{backgroundColor: 'firebrick', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color:'white'}}>
                        Editing clip:   start@{editingClip.start}  end@{editingClip.end} idx@{editingClip.idx}
                    </Text>
                </View>:
                <View></View>
            }

            <View style={styles.buttonConatainer}>
                <TouchableOpacity disabled={editing} style={styles.button}>
                    <Text>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={!editing} style={styles.button} onPress={() => {setEditing(false); setPauseVideo(false); setJump(-1); updateClips(editingClip);}}>
                    <Text>Done</Text>
                </TouchableOpacity>
                
            </View>

            <View style={styles.videoContainer}>
                <VideoPlayer grandPause={pauseVideo} jump={jump} videoSource={videoSource} editing={editing} onProgressHandler={onProgress} onSlidingCompleteHandler={onSlidingComplete}/>
            </View>

            
            <View style={styles.trackContrainer}>
                <MetaTrack 
                    celebrity={celebrity[0] === '--------' ? [] : celebrity[0].slice(0, -3).split(' & ') } 
                    logo={logo[0] === '--------' ? [] : logo[0].slice(0, -3).split(' & ') } 
                    landmark={landmark[0] === '--------' ? [] : landmark[0].slice(0, -3).split(' & ') } 
                    object={object[0] === '--------' ? [] : object[0].slice(0, -3).split(' & ') } 
                    editable={editing} 
                />
            </View>

            
            <View style={styles.thumbnailsConatainer}>
                <Thumbnails clips={clips} onPressHandler={onThumbnailPress}/>
            </View>

            
            
            
            {/* need to replace the grand-button with the multi-slider */}
            {
                editing? 
                <View>
                    <View style={{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', width: '80%'}}>
                        <MultiSlider
                            values={[sliderStart, sliderEnd]}
                            min={0}
                            max={100} //need to be changed
                            step={0.25}
                            customMarker={CustomMarker}
                            minMarkerOverlapDistance={11}
                            onValuesChange={(v1, ) => {setSliderStart(v1[0]); setSliderEnd(v1[1])}}
                            onValuesChangeFinish = {(v1, ) => {setEditingClip({start: v1[0].toFixed(2), end: v1[1].toFixed(2), idx: editingClip.idx})}}
                        />
                    </View>
                </View>
                :
                <View style={styles.grandButtonContainer}>
                    <GrandButton title='press to clip' onPressInHandler={pressIn} onPressOutHandler={pressOut}/>
                </View>

            }

            
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
        buttonConatainer: {
            width: '90%',
            height: '3%',
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        button: {
            borderRadius: 10,
            width: '20%',
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
        trackContrainer: {
            backgroundColor:  'black',
            height: '25%',
            width: '95%',
            margin: 10,
            borderRadius: 10,
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        thumbnailsConatainer: {
            width: '90%',
            height: '10%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        grandButtonContainer: {
            height: '10%', 
            width: '100%', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center'
        }
    }
)