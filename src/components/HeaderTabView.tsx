import { Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from "../pages/Home/HomeStyle"
import femaleImage from '../assets/img/female.png';
import React from "react";
interface HeaderTabViewProps {
    name: string;
    setVisible: (value: boolean) => void;
}
const HeaderTabView: React.FC<HeaderTabViewProps> = ({ name, setVisible }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.nameText}>Hi! {name || 'User'}</Text>
            <TouchableOpacity onPress={() => { setVisible(true) }}>
                <Image
                    source={femaleImage}
                    style={styles.userImage}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}
export default React.memo(HeaderTabView);  