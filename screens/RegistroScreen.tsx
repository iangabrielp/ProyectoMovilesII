import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ref, set } from "firebase/database";
import { db } from '../config/Config';

export default function RegistroScreen() {
  const [cedula, setcedula] = useState('')
  const [nombre, setnombre] = useState('')
  const [edad, setedad] = useState(0)
  const [correo, setcorreo] = useState('')
  const [contrasena, setcontrasena] = useState('')
  const [confirmarContrasena, setConfirmarContrasena] = useState('');


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
    <View>
      <Text>FORMULARIO</Text>
      <TextInput
        placeholder='Ingresar un ID'
        style={styles.input}
        onChangeText={(texto) => setcedula(texto)}
      />

      <TextInput
        placeholder='Ingresar Nombre'
        style={styles.input}
        onChangeText={(texto) => setnombre(texto)}
        value={nombre}
      />
      <TextInput
        placeholder='Ingresar edad'
        style={styles.input}
        onChangeText={(texto) => setedad(+texto)}
        value={edad.toString()}
      />
      <TextInput
        placeholder='Ingresar correo'
        style={styles.input}
        onChangeText={(texto) => setcorreo(texto)}
      />

<TextInput
        placeholder="Ingresar contraseña"
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(texto) => setcontrasena(texto)}
        value={contrasena}
      />

<TextInput
        placeholder="Confirmar contraseña"
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(texto) => setConfirmarContrasena(texto)}
        value={confirmarContrasena}
      />
      <Button title='Guardar' onPress={() => guardar()} />

    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 4,
  }
})

function then(arg0: () => void) {
  throw new Error('Function not implemented.');
}
