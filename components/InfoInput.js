import React from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Button} from 'react-native'
import { useState } from 'react'
const InfoInput = (props) => {
    const [cfg, setCfg] = useState('https://main.net955305.contentfabric.io/config')
    const [id, setId] = useState('iq__3bDimpCDkWKWXzUQ8bwYbPvd1ErT')
    const [libId, setLibId] = useState('ilib3N6aQ3MpkMS9T64U35REBunv3Zez')

    // player setting
    const [player, setPlayer] = useState('hls/dash')
    const [protocol, setProtocol] = useState('hls')
    const [drm ,setDrm] = useState('clear')
    // clear all setting, called after clicked clear button
    const clear = () => {
        setPlayer('hls/dash')
        setProtocol('hls')
        setDrm('clear')
        setCfg('https://main.net955305.contentfabric.io/config')
        setId('iq__3bDimpCDkWKWXzUQ8bwYbPvd1ErT')
        setVideoSource('')
        setLogo([]);
        setCelebrity([]);
        setLandmark([]);
        setObject([]);
        setStt([]);
        videoRef.current.seek(0)
        setPause(false)
        // console.log(route.params.code)
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={{flexDirection:'row', justifyContent: 'space-around', alignItems: 'center', margin: 5}} >
                    <Text style={{color: 'white'}}> content id </Text>
                    <TextInput placeholder='content ID'  style={styles.input} value={id} onChangeText={ (text) => setId(text)}/>
                </View>
                <View style={{flexDirection:'row', justifyContent: 'space-around', alignItems: 'center', margin: 5}} >
                    <Text style={{color: 'white'}}> config url </Text>
                    <TextInput placeholder='config URL'  style={styles.input}  value={cfg} onChangeText={ (text) => setCfg(text)}/>
                </View>
            </View>
            
            
            <View style={styles.buttonConatainer}>
                <TouchableOpacity style={styles.button} onPress={() => props.onload(id, libId, cfg, player, protocol, drm)}>
                    <Text style={{color: 'green'}}>LOAD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={clear}>
                    <Text style={{color: 'red'}}>CLEAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    
}

export default InfoInput

const styles = StyleSheet.create({
    container: {
        height: '100%', 
        width: '100%', 
        flexDirection: 'column', 
        justifyContent: 'space-around', 
        alignItems: 'center'
    },
    inputContainer: {
        height: '45%',
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
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
})