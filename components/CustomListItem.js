import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = (props) => {
    console.log(props.id)
    return (
        <ListItem  key={props.id} bottomDivider>
            <Avatar rounded source={require('../static/images/smallLogo.jpg')} />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: '800',}}>{props.cid}</ListItem.Title>
            </ListItem.Content>
        
        </ListItem>
        
    )
    
}

export default CustomListItem

const styles = StyleSheet.create({})