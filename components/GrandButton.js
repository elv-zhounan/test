import { parseISOWithOptions } from 'date-fns/fp'
import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

const GrandButton = (props) => {
    return (
        <TouchableOpacity 
            activeOpacity={0.5}  
            style={styles.grandButton} 
            onPressIn={() => {props.onPressInHandler()}} 
            onPressOut={() => {props.onPressOutHandler()}}
        >
            <Text style={{color: 'white'}}>{props.title}</Text>
        </TouchableOpacity>
    )
    
}

export default GrandButton

const styles = StyleSheet.create({
    grandButton: {
        height: '90%', 
        width: '60%', 
        backgroundColor: 'indianred', 
        borderRadius: 10, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})