import React, {  useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, ImageBackground} from 'react-native';
import { useDispatch } from 'react-redux';
import {  Location, LocationErrorCode } from 'react-native-get-location';
import { GetLocationWeather } from '../../redux/slices/weatherLocationSlice';
import ModalComponent from '../../components/Modal';
import { styles } from './HomeStyle';
import { getCityFromCoordinates, requestLocation } from '../../utils/LocationHelpers';
import RenderWeatherView from '../../components/RenderWeatherView';
import HeaderView from '../../components/HeaderView';
import RenderTodayWeatherView from '../../components/RenderTodayWeatherView';
import HeaderTabView from '../../components/HeaderTabView';
const Home = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<LocationErrorCode | null>(null);
    const [city, setCity] = useState('');
    const [activeCity, setActiveCity] = useState(false);
    const [locationWeather, setLocationWeather] = useState<any[]>([]);
    const [name, setName] = useState<string>('');
    const [newCity, setNewCity] = useState<string>('');
    const [cityList, setCityList] = useState<string[]>(['Ankara','Gaziantep','İstanbul','İzmir']);
    const [visible, setVisible] = useState(false);
    
    const fetchWeatherForCity = useCallback(async (city: string) => {
        setLoading(true);
        try {
            const locationData = await dispatch(GetLocationWeather({ city }));
            const forecastData = locationData.payload?.forecast.forecastday;
            if (forecastData) {
                setLocationWeather(forecastData);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    const handleCityRetrieval = useCallback(async ({ latitude, longitude }: Coordinates) => {
        try {
            const cityName = await getCityFromCoordinates({ latitude, longitude });
            setCity(cityName);
            fetchWeatherForCity(cityName);
        } catch (error) {
            console.log("Error fetching city from coordinates:", error);
        }
    }, [fetchWeatherForCity]);

    useEffect(() => {
        requestLocation(setLoading, setLocation, setError, handleCityRetrieval);
    }, []);

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <StatusBar barStyle="dark-content" translucent />
            <HeaderTabView name={name} setVisible={setVisible} />
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={require('../../assets/img/background.png')}
                    resizeMode="cover"
                    style={styles.imageBacground} >
                    <HeaderView />
                    <RenderWeatherView  cityList={cityList} activeCity={activeCity} setActiveCity={setActiveCity} setVisible={setVisible} />
                    {loading ? <Text style={styles.loadingText}>Loading...</Text>:
                      <RenderTodayWeatherView locationWeather={locationWeather} city={city} />
                    }
                </ImageBackground>
                <ModalComponent visible={visible} setVisible={setVisible} name={name} setName={setName} cityList={cityList} setCityList={setCityList} newCity={newCity} setNewCity={setNewCity} activeCity={activeCity} setCity={setCity} />          
            </View>
        </View>
    );
};


export default Home;

