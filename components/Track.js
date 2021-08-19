import React from 'react'
import {StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity} from 'react-native'

const Track = (props) => {
    const rejectAlert = () => {
        Alert.alert("reject this tag?", '',
            [
                {text: "Reject", onPress: () => Alert.prompt('Please input the reason', '', [{text: "Reject", onPress: () => console.log("Confirm Pressed")}, {text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},])},
                {text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
            ]
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.track}>
                <View style={styles.trackcontent}>
                    <ScrollView horizontal={true}>
                        {props.celebrity.map((tag) => (

                            <TouchableOpacity disabled={!props.editable} onPress={rejectAlert} style={styles.tag}>
                                <Text style={styles.tagtext}>
                                    {tag}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View style={styles.track}>
                <View style={styles.trackcontent}>
                    <ScrollView horizontal={true}>
                        {props.object.map((tag) => (

                            <TouchableOpacity disabled={!props.editable} onPress={rejectAlert} style={styles.tag}>
                                <Text style={styles.tagtext}>
                                    {tag}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View style={styles.track}>
                <View style={styles.trackcontent}>
                    <ScrollView horizontal={true}>
                        {props.landmark.map((tag) => (

                            <TouchableOpacity disabled={!props.editable} onPress={rejectAlert} style={styles.tag}>
                                <Text style={styles.tagtext}>
                                    {tag}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View style={styles.track}>
                <View style={styles.trackcontent}>
                    <ScrollView horizontal={true}>
                        {props.logo.map((tag) => (

                            <TouchableOpacity disabled={!props.editable} onPress={rejectAlert} style={styles.tag}>
                                <Text style={styles.tagtext}>
                                    {tag}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View>
    )
    
}

export default Track

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'linen',
        borderRadius: 20
    },
    track: {
        backgroundColor: 'transparent',
        height: '20%',
        width: '90%',
        marginVertical: 5,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center'
    },
    trackname: {
        flex:1, 
        borderRadius: 10,  
        marginLeft: 3, 
        height: '90%', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'thistle'
    },
    trackcontent: {
        flex:4, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    tag: {
        backgroundColor: 'indianred', 
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginHorizontal: 5
    },

    tagtext: {
        color: 'black',
        margin: 10,
        fontSize: 12
    }
})