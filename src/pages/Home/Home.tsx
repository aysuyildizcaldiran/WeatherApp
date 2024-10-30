import React, {  useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ImageBackground, ScrollView, Dimensions, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { colors } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import RenderWeather from '../../components/RenderWeather';
import RenderTodayWeather from '../../components/RenderTodayWeather';
import GetLocation, { isLocationError, Location, LocationErrorCode } from 'react-native-get-location';
import { GetLocationWeather } from '../../redux/slices/weatherLocationSlice';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import maleImage from '../../assets/img/male.png';
import femaleImage from '../../assets/img/female.png';
import ModalComponent from '../../components/Modal';
import { styles } from './HomeStyle';
const Home = () => {
    const dispatch = useDispatch();

    const day = new Date();
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(day);
    const hour = day.getHours();
    let greeting = "";

    if (hour >= 6 && hour < 12) {
        greeting = "Good Morning";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Good Day";
    } else {
        greeting = "Good Night";
    }
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<LocationErrorCode | null>(null);
    const [city, setCity] = useState('');
    const [activeCity, setActiveCity] = useState(false);
    const [locationWeather, setLocationWeather] = useState<any[]>([]);
    const [name, setName] = useState<string>('User');
    const [newCity, setNewCity] = useState<string>('');
    const [cityList, setCityList] = useState<string[]>(['Ankara','Gaziantep','İstanbul','İzmir']);
    const [visible, setVisible] = useState(false);
    const requestLocation = () => {
        setLoading(true);
        setLocation(null);
        setError(null);

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 30000,
            rationale: {
                title: 'Location permission',
                message: 'The app needs the permission to request your location.',
                buttonPositive: 'Ok',
            },
        })
            .then(newLocation => {
                setLoading(false);
                //console.log(newLocation);
                setLocation(newLocation);
                getCityFromCoordinates({
                    latitude: newLocation.latitude,
                    longitude: newLocation.longitude
                });

            })
            .catch(ex => {
                if (isLocationError(ex)) {
                    const { code, message } = ex;
                    console.warn(code, message);
                    setError(code);
                } else {
                    console.warn(ex);
                }
                setLoading(false);
                setLocation(null);
            });
    };
    const getCityFromCoordinates = async ({ latitude, longitude }: { latitude: number, longitude: number }) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCcQPqmiqNV49WBL_qkLMAEMyRRMM9WTSE`
            );
            const data = await response.json();

            if (data.results.length > 0) {
                const addressComponents = data.results[0].address_components;
                const cityInfo = addressComponents.find(component =>
                    component.types.includes('locality')
                );
                if (cityInfo) {
                    setCity(cityInfo.long_name);
                    fetchWeatherForCity(cityInfo.long_name);
                    //console.log(cityInfo.long_name);
                } else {
                    setCity('City not found');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        requestLocation();
    }, []);
 
    const fetchWeatherForCity = async (city: string) => {
        try {
            //const response = await dispatch(getDays({ city }));
            //console.log({city},response.payload.current);
            const location = await dispatch(GetLocationWeather({ city }));
            const forecastData = location.payload.forecast.forecastday.map((item: any) => item);
            setLocationWeather(forecastData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <StatusBar barStyle="dark-content" translucent />
            <View style={styles.headerContainer}>
                <Text style={styles.nameText}>Hi! {name}</Text>
                <TouchableOpacity onPress={() => { setVisible(true) }}>
                <Image 
                        source={femaleImage}
                        style={styles.userImage} 
                        resizeMode='contain' 
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={require('../../assets/img/background.png')}
                    resizeMode="cover"
                    style={styles.imageBacground} >
                    <View style={styles.dayDetailsView}>
                        <Text style={styles.greetingText}>{greeting}</Text>
                        <Text style={styles.clockText}>{dayName}, {day.getHours() + ":" + day.getMinutes()}</Text>
                    </View>
                    <View style={styles.otherView}>
                        <View style={styles.otherheaderView}>
                        <Text style={styles.clockText}>Other City</Text>
                        <TouchableOpacity style={styles.addButton} onPress={() => { setActiveCity(true); setVisible(true)}}>
                            <Ionicons name="add-circle-outline" size={30} color={colors.black} />
                        </TouchableOpacity>                   
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.otherScroll}>
                            {cityList.map((city, index) => <RenderWeather key={index} title={city} />)}
                        </ScrollView>
                    </View>
                    {loading ? <Text style={styles.loadingText}>Loading...</Text>:
                    <View style={styles.todayView}>
                        <View style={styles.todayheaderView}>
                            <Text style={styles.todayText}>Today</Text>
                            <View style={styles.locationView}>
                                <EvilIcons name="location" size={20} color={colors.black} />
                                <Text style={styles.clockText}>{city}</Text>
                            </View>
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.todayScroll}>
                            {locationWeather?.map((item: any) => <RenderTodayWeather heat={Math.floor(item.day.avgtemp_c) + '°C'}  title={item.day.condition.text} date={item.date} />)}
                        </ScrollView>
                    </View>
                    }
                </ImageBackground>
                <ModalComponent visible={visible} setVisible={setVisible} name={name} setName={setName} cityList={cityList} setCityList={setCityList} newCity={newCity} setNewCity={setNewCity} activeCity={activeCity} setCity={setCity} />          
            </View>
        </View>
    );
};


export default Home;

