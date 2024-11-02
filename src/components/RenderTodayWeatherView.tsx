import { ScrollView, Text, View } from "react-native";
import RenderTodayWeather from "./RenderTodayWeather";
import { colors } from "../theme";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { styles } from "../pages/Home/HomeStyle";
import React from "react";
interface WeatherItem {
               date: string;
               day: {
                   avgtemp_c: number;
                   condition: {
                       text: string;
                   };
               };
}
interface RenderTodayWeatherViewProps {
               city: string;
               locationWeather: WeatherItem[];
}

const RenderTodayWeatherView: React.FC<RenderTodayWeatherViewProps> = ({ city, locationWeather }) => {
            
    return (
               <View style={styles.todayView}>
               <View style={styles.todayheaderView}>
                   <Text style={styles.todayText}>Today</Text>
                   <View style={styles.locationView}>
                       <EvilIcons name="location" size={20} color={colors.black} />
                       <Text style={styles.clockText}>{city || 'City not available'}</Text>
                   </View>
               </View>
               {locationWeather.length > 0 ? (
               <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.todayScroll}>
                   {locationWeather?.map((item: any) => <RenderTodayWeather key={item.date} heat={Math.floor(item.day.avgtemp_c) + '°C'}  title={item.day.condition.text} date={item.date} />)}
               </ScrollView>
               ) : (
                    <Text style={styles.noDataText}>Weather data is not available</Text>
               )}
           </View>
    )
}

export default React.memo(RenderTodayWeatherView);