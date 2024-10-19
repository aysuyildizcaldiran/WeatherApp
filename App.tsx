

import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/pages/SplashScreen';
import Home from './src/pages/Home';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer> 
    <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
