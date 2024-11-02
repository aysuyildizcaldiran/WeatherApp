import { Text, View } from "react-native";
import { styles } from "../pages/Home/HomeStyle";
import React from "react";


const HeaderView: React.FC = () => {
    const day = new Date();
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(day);
    const hour = day.getHours();

    const getGreetingMessage = (hour: number) => {
        if (hour >= 6 && hour < 12) return "Good Morning";
        if (hour >= 12 && hour < 18) return "Good Day";
        return "Good Night";
    };
    return (
        <View style={styles.dayDetailsView}>
            <Text style={styles.greetingText}>{getGreetingMessage(hour)}</Text>
            <Text style={styles.clockText}>{dayName}, {day.getHours() + ":" + day.getMinutes()}</Text>
        </View>
    );

};

export default React.memo(HeaderView);
