import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import RegistroScreen from '../screens/RegistroScreen';
import LogInScreen from '../screens/LogInScreen';
import PerfileScreen from '../screens/PerfilScreens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tap = createBottomTabNavigator()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={WelcomeScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="Login" component={LogInScreen} />
      <Stack.Screen name="Welcome" component={MyTaps} />
    </Stack.Navigator>
  );
}

function MyTaps(){
  return(
    <Tap.Navigator>
      <Tap.Screen name="Perfil" component={PerfileScreen}/>
    </Tap.Navigator>
  )
}

export default function MainNavigator(){
  return(
      <NavigationContainer>
          <MyStack/>
      </NavigationContainer>

  );
}