import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'


export default function LogInScreen() {
  
 const [correo, setcorreo] = useState('')
  const [contraseña, setcontraseña] = useState('')

  return (
    <ImageBackground source={require('../assets/img/BGRegister.png')} style={{...styles.contenedorAll, paddingLeft:25, paddingRight:25}}>
      <Text style={styles.h1LogReg}>LOGIN</Text>
            <TextInput
              placeholder='Ingrese el correo'
              style={styles.input}
              onChangeText={(texto) => setcorreo(texto)}
              placeholderTextColor={'#f27e95'}
            />
            <TextInput
              placeholder='Ingrese la contraseña'
              style={styles.input}
              onChangeText={(texto) => setcontraseña(texto)}
              placeholderTextColor={'#f27e95'}
            />
            <TouchableOpacity style={styles.btnRegLog}>
                    <Text style={styles.h1btn}>Login</Text>
                  </TouchableOpacity>
      
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 68,
    color:'white',
    fontSize:30,
    borderColor: 'white',
    marginBottom: 10,
    paddingLeft: 16,
    borderRadius: 16,
    backgroundColor:'#a92d45'
  },
  h1LogReg:{
    color:'white',
    fontSize:36,
    fontWeight:'700',
    textAlign:'center',
    marginTop:20,
    marginBottom:40
  },
  h1btn:{
    color:'white',
    fontSize:24,
    fontWeight:'600',
    textAlign:'center',
  },
  contenedorAll:{
    flex:1,
    padding:20,
  },
  btnRegLog:{
    width:'40%',
    backgroundColor:'#8E1149',
    borderRadius:16,
    padding:10,
    marginTop:5
  }
})