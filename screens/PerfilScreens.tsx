import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

export default function PerfileScreen({  }) {
  // Recibimos los datos del usuario a través de props o route params
  const [cedula, setcedula] = useState('')
    const [nombre, setnombre] = useState('')
    const [edad, setedad] = useState(0)
    const [correo, setcorreo] = useState('')
    const [contrasena, setcontrasena] = useState('')
    const [confirmarContrasena, setConfirmarContrasena] = useState('');

  return (
    <ImageBackground
      source={require('../assets/img/BGRegister.png')} // Cambia la imagen de fondo si es necesario
      style={styles.container}
    >
      <Text style={styles.title}>Perfil del Usuario</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cedula:</Text>
        <Text style={styles.value}>{cedula}</Text>

        <Text style={styles.label}>nombre:</Text>
        <Text style={styles.value}>{nombre}</Text>

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Fondo adicional para compatibilidad con la imagen
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 40,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#a92d45',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
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
});
