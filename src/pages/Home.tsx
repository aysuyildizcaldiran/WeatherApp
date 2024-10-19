import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ImageBackground, ScrollView, Dimensions, Image } from 'react-native';
import { colors } from '../theme';

const Home = () => {
               const RenderWeather = ({title,image} : {title?:string,image?:any}) => {
                   return (
                              <View style={{ width:Dimensions.get('window').width/1.5,marginHorizontal:5,
                                             backgroundColor: colors.white ,height:Dimensions.get('window').height/5,borderRadius:30,padding:20}}>
                                     <Text>{title}</Text>
                                     <View style={{flexDirection:'row',height:Dimensions.get('window').height/7,alignItems:'center',justifyContent:'space-between'}}>
                                             <Image source={image} resizeMode='center' style={{width:'70%',height:'100%'}}/>
                                             <Text style={{color:colors.black,fontWeight:'500',fontSize:20}}>24°C</Text>
                                     </View>
                                     </View>
                   )          
               }
               const RenderTodayWeather = ({title,image} : {title?:string,image?:any}) => {
                              return (
                                         <View style={{ flexDirection: 'column',width:Dimensions.get('window').width/4,marginHorizontal:5,alignItems:'center',
                                                        backgroundColor: colors.white ,height:Dimensions.get('window').height/4.5,borderRadius:50,padding:20}}>
                                             <Image source={image} style={{width:80,height:80,alignItems:'center'}}/>
                                             <Text style={{color:colors.black,fontWeight:'500',fontSize:20}}>{title}</Text>
                                            </View>
                              )          
                          }
               return (
                   <View style={styles.container}>
                       <SafeAreaView />
                       <StatusBar barStyle="dark-content" translucent />
                       <View style={{ flex: 0.1, flexDirection: 'row' }} > 
                           <Text style={styles.nameText}>Hi Aysu</Text>
                       </View>
                       <View style={styles.imageContainer}>
                           <ImageBackground 
                               source={require('../assets/img/background.png')} 
                               resizeMode="cover" 
                               style={{ flex: 1 }} >
                                             <View style={{ flex: 0.1, justifyContent: 'center',margin:30,marginTop:35 }}>
                                                            <Text style={{ color: colors.black,fontSize: 25 }}>Goodmorning</Text>
                                                            <Text style={{ color: colors.black,fontSize: 15 }}>Today, 9:00 AM</Text>
                                             </View>
                                             <View style={{ flex: 0.5, justifyContent: 'center',margin:30 }}>
                                                            <Text style={{ color: colors.black,fontSize: 15,marginBottom:15 }}>Other City</Text>
                                                            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{margin:10,marginLeft:0}}>
                                                               <RenderWeather title="Ankara" image={require('../assets/img/14.png')}/>
                                                               <RenderWeather title='İstanbul' image={require('../assets/img/13.png')}/>
                                                               <RenderWeather title='İzmir' image={require('../assets/img/15.png')}/>
                                                            </ScrollView>  
                                             </View>
                                             <View style={{ flex: 0.6, justifyContent: 'center',margin:30 }}>
                                                            <Text style={{ color: colors.black,fontSize: 15,marginBottom:15 }}>Today</Text>
                                                            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{margin:10,marginLeft:0}}>
                                                               <RenderTodayWeather image={require('../assets/img/13.png')      } title='24°C'/>
                                                               <RenderTodayWeather image={require('../assets/img/14.png')      } title='22°C'/>
                                                               <RenderTodayWeather image={require('../assets/img/15.png')      } title='32°C'/>
                                                            </ScrollView>  
                                             </View>
                               </ImageBackground>
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
                   fontWeight: '600',
                   margin: 15,
                   marginLeft: 35
               },
               imageContainer: {
                   flex: 1,
                   borderTopRightRadius: 50,
                   borderTopLeftRadius: 50,
                   overflow: 'hidden',
               }
           });
           
           export default Home;
           
