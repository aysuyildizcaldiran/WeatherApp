
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { colors } from '../theme';


const RenderTodayWeather = ({ title, heat, date }: { title?: string; heat?: string; date?: Date }) => {
    const { height, width } = Dimensions.get('window');
    const [weatherImage, setWeatherImage] = useState<any>(null);

    const day = Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(date).getTime());
    useEffect(() => {
        const weatherImages: { [key: string]: any } = {
            Sunny: require('../assets/img/sunny.png'),
            Clear: require('../assets/img/sunny.png'),
            'Partly cloudy': require('../assets/img/partly_cloudy.png'),
            Overcast: require('../assets/img/cloudy.png'),
            Snow: require('../assets/img/snowy.png'),
            Rain: require('../assets/img/rainy.png'),
            'Patchy rain nearby': require('../assets/img/rainy.png'),
            Mist: require('../assets/img/mist.png'),
        };

        if (title && weatherImages[title]) {
            setWeatherImage(weatherImages[title]);
        }
    }, [title]);

    return (
        <View style={styles.container}>
            <View
                style={styles.weatherCard}>
                <Image source={weatherImage} style={styles.image} />
                <Text style={styles.heatText}>{heat}</Text>
            </View>
            <Text style={styles.dayText}>{day}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex:1,
        justifyContent: 'space-around',
    },
    weatherCard: {
        flexDirection: 'column',
        width: Dimensions.get('window').width / 4,
        height:Dimensions.get('window').height / 4,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        borderRadius: 50,
        paddingVertical: 35
    },
    image: {
        width: 70, height: 70, alignItems: 'center'
    },
    heatText:{
        color: colors.black, fontWeight: '500', fontSize: 15
    },
    dayText:{
        color: colors.black, fontWeight: '400', fontSize: 13 
    }
});


export default RenderTodayWeather;
