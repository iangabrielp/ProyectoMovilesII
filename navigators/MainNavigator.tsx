import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import RegistroScreen from '../screens/RegistroScreen';
import LogInScreen from '../screens/LogInScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PerfileScreen from '../screens/PerfilScreens';
import App from '../App';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator ()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={WelcomeScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="Login" component={LogInScreen} />
      <Stack.Screen name="Welcome" component={MyTabs} />
    </Stack.Navigator>
  );
}

function MyTabs(){
  return(
      <Tab.Navigator>
          <Stack.Screen name="Perfil" component={PerfileScreen} />
      </Tab.Navigator>
  )
}

export default function MainNavigator(){
  return(
      <NavigationContainer>
          <MyStack/>
      </NavigationContainer>

  );
}