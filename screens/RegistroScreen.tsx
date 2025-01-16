import { Alert, Button, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../config/Config'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth'
import { styles } from '../Theme/appTheme';
import * as ImagePicker from 'expo-image-picker';


export default function RegistroScreen() {
  const [cedula, setcedula] = useState('')
  const [nombre, setnombre] = useState('')
  const [edad, setedad] = useState(0)
  const [correo, setcorreo] = useState('')
  const [contrasenia, setcontrasenia] = useState('')
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };




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
        sendEmailVerification(user)
        .then(() => {
          Alert.alert("Éxito", "Registro exitoso. Por favor verifica tu correo.");
          limpiar();
        })
        .catch((error) => {
          Alert.alert("Error", "No se pudo enviar el correo de verificación.");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
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
        placeholder='Ingresar un ID'
        style={styles.input}
        onChangeText={(texto) => setcedula(texto)}
        value={cedula}
        placeholderTextColor={'#f27e95'}
      />

      <TextInput
        placeholder='Ingresar Nombre'
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
<<<<<<< HEAD
      
      <View style={styles.btnRegLog} >
      <Button title="Subir foto" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
    
      <TouchableOpacity onPress={() => guardar()} style={styles.btnRegLog}>
=======
      <TouchableOpacity onPress={() => registro()} style={styles.btnRegLog}>
>>>>>>> 58945859dfcdab866fc7fa5d49e92796ce5e9c20
        <Text style={styles.h1btn}>Confirmar</Text>
      </TouchableOpacity>

    </ImageBackground>
  )
}

