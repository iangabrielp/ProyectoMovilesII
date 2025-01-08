import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={WelcomeScreen} />
      
    </Stack.Navigator>
  );
}

export default function MainNavigator(){
  return(
      <NavigationContainer>
          <MyStack/>
      </NavigationContainer>

  );
}