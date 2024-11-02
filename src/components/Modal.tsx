import React from 'react';
import { View, Modal, Text, TextInput, Button, StyleSheet } from 'react-native';
import { colors } from '../theme';

interface Props {
    visible: boolean;
    setVisible: (value: boolean) => void;
    name: string;
    setName: (value: string) => void;
    cityList: string[];
    setCityList: (value: string[]) => void;
    newCity: string;
    setNewCity: (value: string) => void;
    activeCity: boolean;
    setCity: (value: string) => void;
}


const ModalComponent: React.FC<Props> = ({
    visible,
    setVisible,
    name,
    setName,
    cityList,
    setCityList,
    newCity,
    setNewCity,
    activeCity,
    setCity,
}) => {
    const handleSave = () => {
        setVisible(false);
        if (activeCity && newCity) {
            setCityList([...cityList, newCity]);
        } else if (!activeCity && name) {
            setName(name);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        Enter Your {activeCity ? 'City' : 'Name'}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={`Enter ${activeCity ? 'City' : 'Name'}`}
                        onChangeText={text =>
                            activeCity ? setNewCity(text) : setName(text)
                        }
                        value={activeCity ? newCity : name}
                    />
                    <Button title="Save" onPress={handleSave} color={colors.blue} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
});

export default ModalComponent;

