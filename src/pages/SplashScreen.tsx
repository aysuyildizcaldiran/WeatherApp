import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, Dimensions, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../theme';

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground 
      source={require('../assets/img/background.png')} 
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent />
      <SafeAreaView />
      
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/img/logo.png')} 
          resizeMode="contain" 
          style={styles.logo}
        />
      </View>
      
      <View style={styles.splashContent}>
        <Text style={styles.title}>Weather App</Text>
        <Text style={styles.description}>
          Discover the weather in your city and plan ahead.
        </Text>
        <View style={styles.buttonWrapper}> 
          <TouchableOpacity 
            style={styles.navigateButton} 
            onPress={() => navigation.navigate('Home')}
          >
            <AntDesign name="arrowright" size={35} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  logo: {
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width,
  },
  splashContent: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    width: '80%',
    padding: 20,
    justifyContent: 'center',
    flex:0.4,margin:50
  },
  title: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
  },
  description: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
    marginVertical: 20,
  },
  buttonWrapper: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 30,
    padding: 3,
  },
  navigateButton: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
  },
});


export default SplashScreen;
