import { Alert, Button, ImageBackground, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/Config'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function LogInScreen({ navigation }: any) {

  const [correo, setcorreo] = useState('')
  const [contrasenia, setcontrasenia] = useState('')
  const [ver, setver] = useState(false)

  const [correoRestablecer, setCorreoRestablecer] = useState('')

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Welcome')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let titulo
        let mensaje

        switch (errorCode) {
          case 'auth/wrong-password':
            titulo = 'Error en la contrasenia'
            mensaje = 'Contraseña incorrecta. Verificar'
            limpiar()
            break;
          case 'auth/user-not-found':
            titulo = 'Usuario no encontrado'
            mensaje = 'Por favor verificar el email ingresado'
            limpiar()
            break;
          case 'auth/internal-error':
            titulo = 'Error interno'
            mensaje = 'Error inesperado del servidor de autenticación.'
            limpiar()
            break;
          default:
            titulo = 'Error'
            mensaje = 'Verificar credenciales'
            limpiar()
            break;
        }

        Alert.alert(titulo, mensaje)
      });
  }
  function restablecer() {
    sendPasswordResetEmail(auth, correoRestablecer)
      .then(() => {
        // Password reset email sent!
        // Alert
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  function limpiar() {
    setcontrasenia('')
    setcorreo('')
  }

  return (
    <ImageBackground source={require('../assets/img/BGRegister.png')} style={{ ...styles.contenedorAll, paddingLeft: 25, paddingRight: 25 }}>
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
        onChangeText={(texto) => setcontrasenia(texto)}
        placeholderTextColor={'#f27e95'}
      />
      <TouchableOpacity style={styles.btnRegLog} onPress={() => login()}>
        <Text style={styles.h1btn}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text>Crear una cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setver(true)}>
        <Text>Olvidaste la contraseña? Da clic aquí</Text>
      </TouchableOpacity>
      <Modal visible={ver}>
        <View>
          <TextInput placeholder='Ingresar correo' onChangeText={(texto) => setCorreoRestablecer(texto)} />
          <Button title='Enviar' onPress={() => restablecer()} />
          <Button title='Cerrar' onPress={() => setver(false)} />
        </View>
      </Modal>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 68,
    color: 'white',
    fontSize: 30,
    borderColor: 'white',
    marginBottom: 10,
    paddingLeft: 16,
    borderRadius: 16,
    backgroundColor: '#a92d45'
  },
  h1LogReg: {
    color: 'white',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40
  },
  h1btn: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  contenedorAll: {
    flex: 1,
    padding: 20,
  },
  btnRegLog: {
    width: '40%',
    backgroundColor: '#8E1149',
    borderRadius: 16,
    padding: 10,
    marginTop: 5
  }
})