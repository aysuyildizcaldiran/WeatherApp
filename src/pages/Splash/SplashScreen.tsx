import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, Dimensions, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../../theme';
import { styles } from './SplashStyle';

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground 
      source={require('../../assets/img/background.png')} 
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent />
      <SafeAreaView />
      
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/img/logo.png')} 
          resizeMode="contain" 
          style={styles.logo}
        />
      </View>
      
      <View style={styles.splashContent}>
        <Text style={styles.title}>Weather App</Text>
        <Text style={styles.description}>
        {"Enter your name and location permission and enjoy the app!"}
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

export default SplashScreen;
