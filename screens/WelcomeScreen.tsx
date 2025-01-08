import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function WelcomeScreen({navigation} : any) {
  return (
    <ImageBackground 
    source={{uri:'https://4kwallpapers.com/images/walls/thumbs_3t/20503.jpg'}} 
    style={styles.container}
    >
      <Text style={{fontSize:30, color:'white'}}>Group 3 Games</Text>
      <Button 
       title='LOGIN'
       onPress={()=> navigation.navigate('Bottom')}
       />
       <Button 
       title='REGISTRATE'
       onPress={()=> navigation.navigate('Bottom')}
       />
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})