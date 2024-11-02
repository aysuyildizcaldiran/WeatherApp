import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',

  },
  logo: {
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width,
  },
  splashContent: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    width: '80%',
    padding: 20,
    justifyContent: 'center',
    flex: 0.4, margin: 50
  },
  title: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
  },
  description: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
    marginVertical: 20,
  },
  buttonWrapper: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 30,
    padding: 3,
  },
  navigateButton: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
