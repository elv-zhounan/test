import React from 'react'
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native'
// onPressIn={()=> setPause(true)} onPressOut={() => {seekClip(clip)}}
const Thumbnails = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.clips}>
                <ScrollView horizontal={true}>
                    {props.clips.map((clip) => {
                        return (
                            
                            <TouchableOpacity  style={styles.clip} onPress={() => {props.onPressHandler(clip)}}>
                                <Text style={styles.text}>{clip.start}</Text>
                                <Text style={styles.text}>{clip.end}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {setClips([]); setClipStart(0); setClipsNum(0)}}>
                <Text style={{color: 'red'}}>CLR</Text>
            </TouchableOpacity>
        </View>
    )
    
}

export default Thumbnails

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    clips: {
        borderRadius: 10,
        marginVertical: 5,
        width: '90%',
        height: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,.8)',
    },
    clip: {
        margin: 10, 
        backgroundColor: 'linen', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 2, 
        borderRadius: 10
    },
    button: {
        borderRadius: 10,
        width: '8%',
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,.8)',
    },
    text: {
        fontSize: 12, 
        margin:3, 
    }
})