import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Alert, Text } from 'react-native';
import { auth, db } from '../config/Config'; // Configura Firebase en tu archivo `Config.ts`
import { collection, addDoc } from 'firebase/firestore';
import { ref, set } from 'firebase/database';

interface Position {
  x: number;
  y: number;
}

// Configuración del juego
const BOX_SIZE = 20;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const NUM_COLUMNS = Math.floor(SCREEN_WIDTH / BOX_SIZE);
const NUM_ROWS = Math.floor(SCREEN_HEIGHT / BOX_SIZE);

const SnakeGame: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 5, y: 5 }]);
  const [food, setFood] = useState<Position>({
    x: Math.floor(Math.random() * NUM_COLUMNS),
    y: Math.floor(Math.random() * NUM_ROWS),
  });
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const moveSnake = () => {
    const head = { ...snake[0] };
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    if (
      head.x < 0 ||
      head.x >= NUM_COLUMNS ||
      head.y < 0 ||
      head.y >= NUM_ROWS ||
      snake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      return;
    }

    const newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      setFood({
        x: Math.floor(Math.random() * NUM_COLUMNS),
        y: Math.floor(Math.random() * NUM_ROWS),
      });
      setScore(score + 10);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const saveScore = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const uid = user.uid;
        set(ref(db, 'usuarios/' + uid), {
          score:score
        })
        .then(() => {
          console.log('Datos guardados correctamente');
        })
        .catch((error) => {
          console.error('Error al guardar los datos: ', error);
        });
        
      } catch (error) {
        console.error('Error saving score:', error);
      }
    }
  };

  const resetGame = () => {
    setSnake([{ x: 5, y: 5 }]);
    setFood({
      x: Math.floor(Math.random() * NUM_COLUMNS),
      y: Math.floor(Math.random() * NUM_ROWS),
    });
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    if (gameOver) {
      saveScore();
      Alert.alert(
        '¡Felicitaciones!',
        `Tu puntuación final es: ${score}`,
        [
          { text: 'Reintentar', onPress: resetGame },
          { text: 'Salir', onPress: () => navigation.navigate('LogInScreen') },
        ]
      );
      return;
    }

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);

  return (
    <View style={styles.container}>
      {snake.map((segment, index) => (
        <View
          key={index}
          style={[
            styles.snakeSegment,
            {
              left: segment.x * BOX_SIZE,
              top: segment.y * BOX_SIZE,
            },
          ]}
        />
      ))}
      <View
        style={[
          styles.food,
          {
            left: food.x * BOX_SIZE,
            top: food.y * BOX_SIZE,
          },
        ]}
      />
      <Text style={styles.scoreText}>Puntuación: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  snakeSegment: {
    position: 'absolute',
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: 'green',
  },
  food: {
    position: 'absolute',
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: 'red',
  },
  scoreText: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: 'white',
    fontSize: 20,
  },
});

export default SnakeGame;
