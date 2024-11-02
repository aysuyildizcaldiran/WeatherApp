import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import RenderWeather from "./RenderWeather";
import { styles } from "../pages/Home/HomeStyle";
import { colors } from "../theme";
import Ionicons from 'react-native-vector-icons/Ionicons';


const RenderWeatherView = ({ cityList, activeCity, setActiveCity, setVisible }: any) => {
    return (
        <View style={styles.otherView}>
            <View style={styles.otherheaderView}>
                <Text style={styles.clockText}>Other City</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => { setActiveCity(true); setVisible(true) }}>
                    <Ionicons name="add-circle-outline" size={30} color={colors.black} />
                </TouchableOpacity>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.otherScroll}>
                {cityList.map((city: string, index: number) => <RenderWeather key={index} title={city} />)}
            </ScrollView>
        </View>
    )
}

export default RenderWeatherView;