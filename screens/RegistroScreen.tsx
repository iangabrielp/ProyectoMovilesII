import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {ref, set } from "firebase/database";
import { db } from '../config/Config';

export default function RegistroScreen() {
    const [cedula, setcedula] = useState('')
  const [nombre, setnombre] = useState('')
  const [edad, setedad] = useState(0)
  const [correo, setcorreo] = useState('')


  function guardar() {
    set(ref(db, 'usuarios/' + cedula), {
      name: nombre,
      age: edad,
      email: correo
    });
  }

  function limpiar (){
    setnombre('')
    setedad(0)
  }

  useEffect(() => {
    if (Number.isNaN(edad)){
      setedad (0)
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

      <Button title='Guardar' onPress={()=>guardar()}/>

    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        height: 45,
        fontSize: 30,
        backgroundColor: '#93afeb',
        margin: 10,
        borderRadius: 10,
        paddingHorizontal: 20
      }
})