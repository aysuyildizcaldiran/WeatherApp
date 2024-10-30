import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { getDays } from '../redux/slices/weatherDaySlice';
import { colors } from '../theme';
const RenderWeather = ({ title }: { title?: string }) => {
               const [weatherData, setWeatherData] = useState<any>(null);
               const [weatherImage, setWeatherImage] = useState<any>(null);
               const dispatch = useDispatch();
               const height = Dimensions.get('window').height;
               const width = Dimensions.get('window').width;
               useEffect(() => {
                              // Her şehir için hava durumu bilgisini çek
                              const fetchWeather = async () => {
                                             const response = await dispatch(getDays({ city: title }));
                                             setWeatherData(response.payload.current);
                                             if (response.payload.current) {
                                                            //console.log('weatherData', response.payload.current.condition.text)
                                                            if (response.payload.current.condition.text === 'Sunny' || response.payload.current.condition.text === 'Clear') {
                                                                           setWeatherImage(require('../assets/img/sunny.png'));
                                                            } else if (response.payload.current.condition.text === 'Partly cloudy') {
                                                                           setWeatherImage(require('../assets/img/partly_cloudy.png'));
                                                            } else if (response.payload.current.condition.text === 'Overcast') {
                                                                           setWeatherImage(require('../assets/img/cloudy.png'));
                                                            }
                                             }
                              };

                              fetchWeather();

               }, [title]);

               return (
                              <View style={{
                                             width: width / 1.5, marginHorizontal: 5,
                                             backgroundColor: colors.white, borderRadius: 30, padding: 20
                              }}>
                                             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            <Text style={{ height: height / 20, fontWeight: '500', fontSize: 15 }}>{title}</Text>
                                                            <Text style={{ color: colors.black, fontWeight: '400', fontSize: 14 }}>{weatherData?.condition.text}</Text>
                                             </View>
                                             <View style={{ flexDirection: 'row', height: height / 6, alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <Image source={weatherImage} resizeMode='cover' style={{ width: '50%', height: '100%' }} />
                                                            <Text style={{ color: colors.black, fontWeight: '500', fontSize: 18 }}>{Math.floor(weatherData?.temp_c)}°C</Text>
                                             </View>
                              </View>
               )
}


const styles = StyleSheet.create({
               container: {
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#2c3e50',
               },
});

export default RenderWeather;
