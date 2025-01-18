import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <ImageBackground
      source={{ uri: 'https://4kwallpapers.com/images/walls/thumbs_3t/20503.jpg' }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Juego de la Serpiente</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="LOGIN"
            onPress={() => navigation.navigate('Login')}
            color="#4CAF50"
          />
          <View style={styles.space} />
          <Button
            title="REGÍSTRATE"
            onPress={() => navigation.navigate('Registro')}
            color="#2196F3"
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
  },
  space: {
    height: 10,
  },
});