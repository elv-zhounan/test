import React, {useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  Text
} from 'react-native';

const BLUR_OPACITY = 0.5;
const LoginScreen = ({navigation, route}) => {
    const inputRef = React.useRef()
    const loginButton = React.useRef()
    const [code, setCode] = React.useState('')

    useLayoutEffect(() => {
      navigation.setOptions({
          title: 'LOGIN',
          headerLeft: () => (
              <View style={{merginLeft: 20}}>
                  <TouchableOpacity onPress={() => {navigation.navigate('Home')}} activeOpacity={0.5}>
                      <Text style={{color: 'white'}}>Back</Text>
                  </TouchableOpacity>
              </View>

          ),

      }); 
    });


    const submit = () => {
        if (code === '') {
            Alert.alert(
                "private key error",
                "you can not input an empty private key",
            )
        }
        else{
            navigation.navigate('Video', {code: code})
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Image style={styles.logo} source={require('../static/images/fulllogo.jpg')} />
                    <TouchableOpacity activeOpacity={0.5}>
                        <TextInput 
                            style={styles.inputStyle} 
                            secureTextEntry 
                            placeholderTextColor="gray" 
                            placeholder='private key'
                            ref={inputRef}
                            keyboardAppearance="dark"
                            onChangeText={(text)=>{setCode(text)}}
                            value={code}
                            onSubmitEditing={submit}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Button 
                        ref={loginButton} 
                        title='Login' 
                        onPress={submit}
                    ></Button>
                </TouchableOpacity>
                
            </View>
        </View>
    );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    maxHeight: '100%',
    backgroundColor: 'black'
  },
  black: {
    backgroundColor: 'black',
  },
  noOpacity: {
    opacity: 0,
  },
  formLabel: {
    marginTop: 10,
    fontSize: 20,
    color: 'gray',
  },
  background: {
    resizeMode: 'contain',
    margin: 50,
    maxHeight: 150,
    width: '90%',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    //backgroundColor: 'rgba(0,0,0,1)',
    justifyContent: 'flex-start',
    marginTop: 20,
    width: '80%',
  },
  logo: {
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 50,
    resizeMode: 'contain',
    width: '100%',
    height: 225,
  },
  inputContainer: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  inputStyle: {
    marginBottom: 20,
    width: '100%',
    height: 60,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,.8)',
    fontWeight: '400',
    color: 'black',
    //textShadowColor: 'gray',
    letterSpacing: 3,
    fontFamily: 'Helvetica',
    fontSize: 12,
    borderRadius: 10,
    //borderWidth: 1,
    //borderColor: "white",
    opacity: 1,
    //borderWidth: 3,
    //borderColor: '#3E2E02'
  },
  formText: {
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: '200',
    letterSpacing: 7,
    fontFamily: 'HelveticaNeue',
    color: '#F4E8D6',
  },
  
  
  unfocused: {
    opacity: BLUR_OPACITY,
    backgroundColor: 'rgba(200,200,200,.5)',
    color: 'white',
  },
});

export default LoginScreen;
