import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../theme";

export const styles = StyleSheet.create({
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
               imageBacground:{
                   flex:1
               },
               dayDetailsView:{
                   flex: 0.1, justifyContent: 'center', margin: 30, marginTop: 35
               },
               greetingText:{
                   color: colors.black, fontSize: 25
               },
               clockText:{
                   color: colors.black, fontSize: 15
               },
               otherView:{
                   flex: 0.4, justifyContent: 'center', margin: 10, marginLeft: 20 
               },
               otherheaderView:{
                   flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',paddingBottom: 10
               },
               addButton:{
                   marginRight: 10
               },
               otherScroll:{
                   padding: 5, marginLeft: 0
               },
               loadingText:{
                   color: colors.black, fontSize: 25
               },
               todayView:{
                   flex: 0.5, justifyContent: 'center', alignSelf: 'center', margin: 10 
               },
               todayheaderView:{
                   flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15,flex:0.1 ,marginHorizontal:10
               },
               todayText:{
                   color: colors.black, fontSize: 15, 
               },
               locationView:{
           flexDirection: 'row', alignItems: 'center'
               },
               todayScroll:{
                   padding: 5 ,flex:0.4
               }
           
           });
                      