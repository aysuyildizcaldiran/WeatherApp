import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ImageBackground, ScrollView, Dimensions, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { colors } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { getDays } from '../redux/slices/weatherDaySlice';
import RenderWeather from '../components/RenderWeather';
import RenderTodayWeather from '../components/RenderTodayWeather';
import GetLocation, { isLocationError, Location, LocationErrorCode } from 'react-native-get-location';
import { GetLocationWeather } from '../redux/slices/weatherLocationSlice';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import maleImage from '../assets/img/male.png';
import femaleImage from '../assets/img/female.png';
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
    const [locationWeather, setLocationWeather] = useState<any[]>([]);
    const [name, setName] = useState<string>('');
    const [gender, setGender] = useState('male');
    const [avatar, setAvatar] = useState(maleImage);

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
    useEffect(() => {
        setAvatar(gender === 'male' ? maleImage : femaleImage);
    }, [gender]);
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
                        source={avatar} // gender durumuna göre image
                        style={styles.userImage} 
                        resizeMode='contain' 
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={require('../assets/img/background.png')}
                    resizeMode="cover"
                    style={{ flex: 1 }} >
                    <View style={{ flex: 0.1, justifyContent: 'center', margin: 30, marginTop: 35 }}>
                        <Text style={{ color: colors.black, fontSize: 25 }}>{greeting}</Text>
                        <Text style={{ color: colors.black, fontSize: 15 }}>{dayName}, {day.getHours() + ":" + day.getMinutes()}</Text>
                    </View>
                    <View style={{ flex: 0.6, justifyContent: 'center', margin: 10, marginLeft: 20 }}>
                        <Text style={{ color: colors.black, fontSize: 15, paddingBottom: 15 }}>Other City</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ padding: 5, marginLeft: 0 }}>
                            <RenderWeather title="Ankara" />
                            <RenderWeather title="Gaziantep" />
                            <RenderWeather title='İstanbul' />
                            <RenderWeather title='İzmir' />
                        </ScrollView>
                    </View>
                    <View style={{ flex: 0.6, justifyContent: 'center', alignSelf: 'center', marginHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                            <Text style={{ color: colors.black, fontSize: 15, }}>Today</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <EvilIcons name="location" size={20} color={colors.black} />
                                <Text style={{ color: colors.black, fontSize: 15 }}>{city}</Text>
                            </View>
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ padding: 5 }}>
                            {locationWeather?.map((item: any) => <RenderTodayWeather heat={item.day.avgtemp_c + '°C'} title={item.day.condition.text} date={item.date} />)}
                        </ScrollView>
                    </View>
                </ImageBackground>
                <Modal
                    animationType="slide"
                    transparent={true} // Arka planı yarı saydam yapar
                    visible={visible}
                    onRequestClose={() => setVisible(!visible)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Enter Your Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter name"
                                onChangeText={text => setName(text)}
                                value={name}
                            />
                            <Text style={styles.modalText}>Select Gender</Text>
                            <View style={styles.genderContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.genderButton,
                                        gender === 'Male' && styles.selectedButton,
                                    ]}
                                    onFocus={() => setGender('Male')}
                                    onPress={() => setGender('Male')}
                                >
                                    <Text style={styles.genderText}>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.genderButton,
                                        gender === 'Female' && styles.selectedButton,
                                    ]}
                                    onFocus={() => setGender('Female')}
                                    onPress={() => setGender('Female')}
                                >
                                    <Text style={styles.genderText}>Female</Text>
                                </TouchableOpacity>
                            </View>

                            <Button title="Save" onPress={() => { setVisible(!visible); console.log({ name, gender }) }} color="#2196F3" />
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    nameText: {
        fontSize: 25,
        fontWeight: '500',
    },
    imageContainer: {
        flex: 1,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        overflow: 'hidden',
    },
    userImage: {
        width: Dimensions.get('window').width / 10,
        height: Dimensions.get('window').height / 10,

    },
    headerContainer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '90%',
        marginHorizontal: '5%',
        borderRadius: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arka planı koyu ve yarı saydam yapar
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 15,
    },
    genderButton: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '45%',
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
    },
    genderText: {
        color: '#000',
    },
});

export default Home;

