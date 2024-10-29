

import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/pages/SplashScreen';
import Home from './src/pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
