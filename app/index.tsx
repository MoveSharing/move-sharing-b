import { useColors } from "@/hooks/useColors";
import React from "react";
import { Button, View, StyleSheet, SafeAreaView,Text, Image, ScrollView } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { assets } from "@/assets";
// const SignOutButton = () => {
//   const { signOut } = useAuthenticator();

//   return (
//     <View style={styles.signOutButton}>
//       <Button title="Sign Out" onPress={signOut} />
//     </View>
//   );
// };

const Index = () => {
  const Colors=useColors();
  return (
        <SafeAreaView style={{backgroundColor:"white",flex:1}}>
          <ScrollView style={{flex:1}}>
          <View style={[styles.container,{height:200,flexDirection:"row"}]}>
            <View style={{width:"30%"}}>
              <View style={[styles.batteryContainer,{backgroundColor:Colors.placeHolder,}]}>
                <View style={[styles.batteryBar,{height:"70%",backgroundColor:Colors.primary}]}>
                
                </View>
                <View style={styles.batteryTextContainer}>
                  <Text style={styles.batteryText}>70%</Text>
                  <Text style={[styles.batteryText,{fontSize:16}]}>Charging</Text>
                </View>
              </View>
            </View> 
            <View style={{width:"70%",gap:10,height:"100%"}}> 
              <View style={[styles.distanceContainer,{backgroundColor:Colors.primary}]}>
                <Text style={{fontStyle:"italic",fontSize:16,fontWeight:"900",color:"white",
                  position:"absolute",
                  left:10,
                  top:5
                }}>Distance Driven</Text>
                <View>
                  <Text style={{fontStyle:"italic",fontSize:30,fontWeight:"900"}}>1.2km</Text>
                </View>
                <Entypo name="location" size={40} color="black" />
              </View>
              <View style={[styles.distanceContainer,{backgroundColor:Colors.primary}]}>
              <Text style={{fontStyle:"italic",fontSize:16,fontWeight:"900",color:"white",
                  position:"absolute",
                  left:10,
                  top:5
                }}>Distance Driven</Text>
                <View>
                  <Text style={{fontStyle:"italic",fontSize:30,fontWeight:"900"}}>1.2km</Text>
                </View>
                <MaterialCommunityIcons name="scooter" size={40} color="black" />
              </View>
            </View>
          </View>
            <View style={styles.container}>
            <View style={{width:"100%",gap:10,height:120,backgroundColor:Colors.placeHolder,borderRadius:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between",padding:10}}>
              <Text style={{fontStyle:"italic",fontSize:16,fontWeight:"900",color:Colors.secondary,
                  position:"absolute",
                  left:10,
                  top:10
                }}>Model</Text>
                <Text style={{fontStyle:"italic",fontSize:40,fontWeight:"900"}}>
                  Scooter X
                </Text>
                  <Image source={assets.scooter} style={{width:150,height:150}}/>
            </View>
            </View>
            <View style={styles.container}>
              <View style={{width:"100%",gap:10,height:150,backgroundColor:Colors.placeHolder,borderRadius:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between",padding:10}}></View>
              </View>
            <View style={styles.container}>
              <View style={{width:"100%",gap:10,height:160,backgroundColor:Colors.placeHolder,borderRadius:10,alignItems:"center",justifyContent:"space-between",padding:10}}>
                <View style={{flex:1,width:"100%",flexDirection:"row",gap:10}}>
                  <View style={{justifyContent:"center",alignItems:"center",flex:1,backgroundColor:Colors.primary,borderRadius:10}}>
                    <Ionicons name="flash" size={32} color="black" />
                  </View>
                  <View style={{justifyContent:"center",alignItems:"center",flex:1,backgroundColor:Colors.primary,borderRadius:10}}>
                    <Ionicons name="power" size={32} color="black" />
                  </View>

                </View>
                <View style={{flex:1,width:"100%"}}>
                  <View style={{flex:1,width:"100%",flexDirection:"row",gap:10,backgroundColor:Colors.primary,borderRadius:10,padding:5,justifyContent:"space-between"}}>
                  <View style={{justifyContent:"center",alignItems:"center",height:"100%",backgroundColor:Colors.secondary,borderRadius:10,width:50}}>
                    <MaterialCommunityIcons name="lock" size={30} color={Colors.primary} />
                  </View>
                  <View style={{justifyContent:"center",alignItems:"center",height:"100%",borderRadius:10,width:50}}>
                  <MaterialCommunityIcons name="lock-open" size={30} color={"white"} />
                  </View>
                  
                  </View>
                </View>
              </View>
              </View>
              </ScrollView>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer:{},
  container:{
    paddingHorizontal:20,
    paddingVertical:10,
    gap:10,
    width:"100%",
  },
  batteryContainer:{height:"100%", width:"100%",borderRadius:10,justifyContent:"flex-end",overflow:"hidden"},
  batteryBar:{
    width:"100%",
  },
  batteryTextContainer:{
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%, -50%)",

  },
  batteryText:{
    textAlign:"center",
    fontSize:32,
    fontStyle:"italic",
    fontWeight:"900",
  },
  distanceContainer:{
    padding:10,
    alignItems:"center",
    justifyContent:"space-between",
    flex:1,
    borderRadius:10,
    flexDirection:"row"
  }
});

export default Index;