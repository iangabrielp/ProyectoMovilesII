import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import RegistroScreen from '../screens/RegistroScreen';
import LogInScreen from '../screens/LogInScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GaleriaScreen from '../screens/GaleriaScreen';
import CamaraScreen from '../screens/CamaraScreen';

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
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Galeria" component={GaleriaScreen} />
            <Stack.Screen name="Camara" component={CamaraScreen} />
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