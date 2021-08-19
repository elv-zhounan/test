import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { useState } from 'react';
import Video from 'react-native-video';
import {Slider} from 'react-native'   // has been deprecated, need to find some ways to replace it.
import { useEffect } from 'react';

const VideoPlayer = (props) => {
    const videoRef = React.useRef();
    const sliderRef = React.useRef();
    const [duration, setDuration] = useState(0.0)
    const [currentTime, setCurrentTime] = useState(0.0)
    const [pause, setPause]  = useState(true)
    const [rate, setRate] = useState(1)
    const [volume, setVolume] = useState(1)
    const [muted, setMuted] = useState(false)
    const [resizeMode, setResizeMode] = useState('contain')

    // useEffect(() => {
    //     if(props.grandPause){
    //         setPause(true)
    //     }
    // }, [props.grandPause])

    useEffect(() => {
        if(props.jump > 0){
            videoRef.current.seek(props.jump);
            setCurrentTime(props.jump)
        }
    }, [props.jump])

    const onLoad = (data) => {
        setDuration(data.duration);
    };

    const onProgress = (data) => {
        setCurrentTime(data.currentTime);
        props.onProgressHandler(data.currentTime, videoRef)
    };

    const onEnd = () => {
        videoRef.current.seek(0);
    };

    const onSlidingValueChange = (v) => {
        setPause(true); 
        setCurrentTime(v); 
    };

    const onSlidingComplete = (v) => {
        setPause(true)
        videoRef.current.seek(v);
        props.onSlidingCompleteHandler(v);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.video} onPress={() => setPause(!pause)}>
                <Video  
                    ref={videoRef}
                    source = {(props.videoSource.startsWith('../static') || props.videoSource === '') ? require('../static/videos/EluvioLive.mp4') : {uri: props.videoSource}}
                    style={{position: 'absolute', top: 5, left: 5, bottom: 5, right: 5, }}
                    rate={rate}
                    paused={pause}
                    volume={volume}
                    muted={muted}
                    resizeMode={resizeMode}
                    onLoad={onLoad}
                    onProgress={onProgress}
                    onEnd={onEnd}
                />
            </TouchableOpacity>
            <View style={styles.controls}>
                <View style={styles.rateControl}>
                    <Text style={styles.controlOption}>speed</Text>
                    <TouchableOpacity onPress={() => {setRate(0.25)}}><Text style={[styles.controlOption, {fontWeight: rate===0.25 ? 'bold' : 'normal'}]}>x0.25</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {setRate(0.5)}}><Text style={[styles.controlOption, {fontWeight: rate===0.5 ? 'bold' : 'normal'}]}>x0.5</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {setRate(1)}}><Text style={[styles.controlOption, {fontWeight: rate===1 ? 'bold' : 'normal'}]}>x1</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {setRate(1.5)}}><Text style={[styles.controlOption, {fontWeight: rate===1.5 ? 'bold' : 'normal'}]}>x1.5</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {setRate(2)}}><Text style={[styles.controlOption, {fontWeight: rate===2 ? 'bold' : 'normal'}]}>x2</Text></TouchableOpacity>
                </View>

                <View style={styles.volumeControl}>
                    <Text style={styles.controlOption}>vol</Text>
                    <TouchableOpacity onPress={() => {setVolume(0.5)}}><Text style={[styles.controlOption, {fontWeight: volume===0.5 ? 'bold' : 'normal'}]}>x0.5</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {setVolume(1)}}><Text style={[styles.controlOption, {fontWeight: volume===1 ? 'bold' : 'normal'}]}>x1</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {setVolume(1.5)}}><Text style={[styles.controlOption, {fontWeight: volume===1.5 ? 'bold' : 'normal'}]}>x1.5</Text></TouchableOpacity>
                </View>
            </View>
            <View style={styles.progress}>
                <Text style={{color: 'white'}}>{currentTime.toFixed(0)}s</Text>
                {/* we want to call 'seek' function while complete sliding. If we call this functino while value chaning, it will bring too much burden to our device */}
                <Slider
                    style={{width: '70%', height: '95%'}}
                    minimumValue={0}
                    maximumValue={duration}
                    onValueChange={(v) => onSlidingValueChange(v)}
                    onSlidingComplete = {(v) => onSlidingComplete(v)}
                    ref={sliderRef}
                    value={currentTime}
                    disabled={props.editing}
                />
                <Text style={{color: 'white'}}>{duration.toFixed(0)}s</Text>
            </View>
        </View>
        
    )
    
}

export default VideoPlayer

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        height: '100%', 
        borderRadius: 10,
        alignItems: 'center', 
        backgroundColor: 'black', 
        marginTop: 5,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    video: {
        alignItems: 'center',
        width: '100%',
        height: '60%'
    },
    controls: {
        width: '100%',
        height: '10%',
        backgroundColor: 'transparent',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    rateControl: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    volumeControl: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 13,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
    progress: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 3,
        overflow: 'hidden',
        margin: 5
    },
})