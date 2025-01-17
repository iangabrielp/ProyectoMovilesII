import { Alert, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

//Firebase
import { db } from '../config/Config'
import { getDatabase, ref, onValue, set } from "firebase/database";

export default function PerfileScreen({ }) {
  // Recibimos los datos del usuario a través de props o route params
  const [cedula, setcedula] = useState('')
  const [nombre, setnombre] = useState('')
  const [correo, setcorreo] = useState('')
  const [score, setscore] = useState(0)
  const [edad, setedad] = useState(0)
  
  const defaultImage = 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-male-icon.png'

  const [datos, setdatos] = useState()

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const uid = user.uid;

      const userRef = ref(db, 'usuarios/' + uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setcedula(data.cedula)
        setnombre(data.nombre)
        setcorreo(data.correo)
        setscore(data.score)
        setedad(data.edad)
      });

    } else {
      Alert.alert('Error', 'Ha habido un error');
    }
  }, [])
  
  return (
    <ImageBackground
      source={require('../assets/img/BGRegister.png')} // Cambia la imagen de fondo si es necesario
      style={styles.container}
    >

      <Text style={styles.title}>Perfil del Usuario</Text>
      <Image source={{ uri: defaultImage }} style={styles.image}/>
      <Text style={styles.titleh2}>¡Bienvenido {nombre}!</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.value}>{nombre}</Text>

        <Text style={styles.label}>Score:</Text>
        <Text style={styles.value}>{score}</Text>

        <Text style={styles.label}>Cédula:</Text>
        <Text style={styles.value}>{cedula}</Text>

        <Text style={styles.label}>Edad:</Text>
        <Text style={styles.value}>{edad}</Text>

        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{correo}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  titleh2:{
    color: 'white',
    fontSize: 22,
    fontWeight: '400',
    textAlign:'center',
    marginBottom: 10,
    marginTop:10
  },
  infoContainer: {
    width: '80%',
    backgroundColor: '#a92d45',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    alignSelf:'center'
  },
  label: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  value: {
    color: '#f27e95',
    fontSize: 18,
    marginBottom: 15,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius:100,
    alignSelf:'center',
    borderWidth:4,
    borderColor:'white'
  },
});
