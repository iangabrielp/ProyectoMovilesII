import { Alert, Button, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/Config'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth'
import { styles } from '../Theme/appTheme';
import { ref, set } from 'firebase/database';

export default function RegistroScreen(props:any) {
  const [cedula, setcedula] = useState('')
  const [nombre, setnombre] = useState('')
  const [edad, setedad] = useState(0)
  const [correo, setcorreo] = useState('')
  const [contrasenia, setcontrasenia] = useState('')
  const [confirmarContrasena, setConfirmarContrasena] = useState('');




  function registro() {
    if (contrasenia !== confirmarContrasena) {
      Alert.alert("Error", "La contraseña no coincide")
      return
    }
    if (!correo.includes('@')) {
      Alert.alert("Error", "Por favor ingresa un correo válido");
      return;
    }
    if (cedula.trim() === '' || nombre.trim() === '' || edad <= 0) {
      Alert.alert("Error", "Por favor completa todos los campos correctamente");
      return;
    }

    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user
        verificar();
        guardarDatosUsuario(user.uid);
        limpiar();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let titulo
        let mensaje

        switch (errorCode) {
          case 'auth/email-already-exists':
            titulo = 'Error en el correo'
            mensaje = 'El correo ya está en uso'
            limpiar()
            break;
          case 'auth/invalid-argument':
            titulo = 'Error'
            mensaje = 'Argumento no válido proporcionado.'
            limpiar()
            break;
          case 'auth/invalid-credential':
            titulo = 'Error inesperado'
            mensaje = 'La credencial no es válida para la acción deseada.'
            limpiar()
            break;
          default:
            titulo = 'Error'
            mensaje = 'Verificar credenciales'
            limpiar()
            break;
        }
        Alert.alert(titulo, mensaje)
      })
  }

  function verificar() {
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          Alert.alert('¡Listo!', 'Por favor verifique su correo ')
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
        });
    } else {
    }
  }

  function guardarDatosUsuario(uid:String) {
    const userRef = ref(db, 'usuarios/' + uid);
    set(userRef,{
      cedula:cedula,
      nombre:nombre,
      edad:edad,
      correo:correo,
      score:0
    })
  }

  function limpiar() {
    setnombre('');
    setedad(0);
    setcorreo('');
    setcedula('');
    setcontrasenia('');
    setConfirmarContrasena('');
  }

  useEffect(() => {
    if (Number.isNaN(cedula)) {
      setedad(0)
    }
  }
    , [edad])


  return (
    <ImageBackground source={require('../assets/img/BGRegister.png')} style={{ ...styles.contenedorAll, paddingLeft: 25, paddingRight: 25 }}>
      <Text style={styles.h1LogReg}>REGISTRO</Text>
      <TextInput
        placeholder='Ingresar cédula'
        style={styles.input}
        onChangeText={(texto) => setcedula(texto)}
        value={cedula}
        placeholderTextColor={'#f27e95'}
      />

      <TextInput
        placeholder='Ingresar Usuario'
        style={styles.input}
        onChangeText={(texto) => setnombre(texto)}
        value={nombre}
        placeholderTextColor={'#f27e95'}
      />
      <TextInput
        placeholder='Ingresar edad'
        style={styles.input}
        onChangeText={(texto) => setedad(+texto)}
        value={edad.toString()}
        placeholderTextColor={'#f27e95'}
      />
      <TextInput
        placeholder='Ingresar correo'
        style={styles.input}
        onChangeText={(texto) => setcorreo(texto)}
        value={correo}
        placeholderTextColor={'#f27e95'}
      />

      <TextInput
        placeholder="Ingresar contraseña"
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(texto) => setcontrasenia(texto)}
        value={contrasenia}
        placeholderTextColor={'#f27e95'}
      />

      <TextInput
        placeholder="Confirmar contraseña"
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(texto) => setConfirmarContrasena(texto)}
        value={confirmarContrasena}
        placeholderTextColor={'#f27e95'}
      />
      <TouchableOpacity onPress={() => registro()} style={styles.btnRegLog}>
        <Text style={styles.h1btn}>Confirmar</Text>
      </TouchableOpacity>

    </ImageBackground>
  )
}
