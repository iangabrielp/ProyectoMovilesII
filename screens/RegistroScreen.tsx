import { Alert, Button, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ref, set } from "firebase/database";
import { db } from '../config/Config';
import { styles } from '../Theme/appTheme';
import * as ImagePicker from 'expo-image-picker';


export default function RegistroScreen() {
  const [cedula, setcedula] = useState('')
  const [nombre, setnombre] = useState('')
  const [edad, setedad] = useState(0)
  const [correo, setcorreo] = useState('')
  const [contrasena, setcontrasena] = useState('')
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


  function guardar() {
    if (contrasena !== confirmarContrasena) {
      Alert.alert('Error', 'La contraseña no coincide');
      return;
    }


    set(ref(db, 'usuarios/' + cedula), {
      name: nombre,
      age: edad,
      email: correo,
      password: contrasena
    }).then(() => {
      limpiar();  // Limpia el formulario después de guardar
      Alert.alert('Éxito', 'Usuario registrado correctamente');
    }).catch((error) => {
      Alert.alert('Error', 'Hubo un problema al guardar los datos');
    });

  }

  function limpiar() {
    setnombre('');
    setedad(0);
    setcorreo('');
    setcedula('');
    setcontrasena('');
    setConfirmarContrasena('');
  }

  useEffect(() => {
    if (Number.isNaN(edad)) {
      setedad(0)
    }
  }
    , [edad])


  return (
    <ImageBackground source={require('../assets/img/BGRegister.png')} style={{...styles.contenedorAll, paddingLeft:25, paddingRight:25}}>
      <Text style={styles.h1LogReg}>REGISTRO</Text>
      <TextInput
        placeholder='Ingresar un ID'
        style={styles.input}
        onChangeText={(texto) => setcedula(texto)}
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
        placeholderTextColor={'#f27e95'}
      />

<TextInput
        placeholder="Ingresar contraseña"
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(texto) => setcontrasena(texto)}
        value={contrasena}
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
      <View style={styles.btnRegLog} >
      <Button title="Subir foto" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
    
      <TouchableOpacity onPress={() => guardar()} style={styles.btnRegLog}>
        <Text style={styles.h1btn}>Confirmar</Text>
      </TouchableOpacity>

    </ImageBackground>
  )
}

