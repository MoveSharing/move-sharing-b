import { Image, Text, View,StyleSheet, StatusBar, Modal, Pressable, ScrollView } from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto';
import { assets } from "@/assets";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCurrentUser } from 'aws-amplify/auth';
import { useEffect, useState } from "react";
import { useColors } from "@/hooks/useColors";
import { OpsItemSeverity } from "aws-cdk-lib/aws-cloudwatch-actions";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
type User={
    username:string,
    userId:string,
    signInDetails:string
}
export default function MainScreenHeader() {
    const [modalVisible,setModalVisible]=useState<boolean>(false);
    const Colors=useColors();
    const [currentUser,setCurrentUser]=useState<User | null>();
    useEffect(()=>{
        const fetchCurrentUser=async ()=>{
            const { username, userId, signInDetails } = await getCurrentUser();
            console.log({username,userId,signInDetails});
            setCurrentUser({username,userId,signInDetails : signInDetails as string});
        }
        fetchCurrentUser();
    },[])
    return (
        <SafeAreaView style={[styles.rootContainer,{backgroundColor:"white"}]}>
            <Modal visible={modalVisible} transparent >
                <View style={{flexDirection:"row",height:"100%"}}>
                <View style={{flex:3,backgroundColor:"white"}}>
                    <View style={{backgroundColor:Colors.primary,width:"100%",paddingHorizontal:10,paddingVertical:20}}>
                        <Text style={{color:Colors.secondary,fontSize:32,fontStyle:"italic",fontWeight:"900"}}>John Doe</Text>
                        <Text style={{color:"white",fontSize:14,fontStyle:"italic",fontWeight:"900"}}>hjohndoe@email.com</Text>
                        <Text style={{color:"white",fontSize:14,fontStyle:"italic",fontWeight:"900"}}>0120000000</Text>
                    </View>
                    <ScrollView style={{flex:1,padding:10}}>
                        <View style={{gap:20,flexDirection:"row",alignItems:"center",backgroundColor:Colors.primary,padding:20,borderRadius:10,marginBottom:10}}>
                        <FontAwesome5 name="user-alt" size={32} color="black" />
                        <Text style={{color:"black",fontSize:26,fontStyle:"italic",fontWeight:"900"}}>Profile</Text>
                        </View>
                        <View style={{gap:20,flexDirection:"row",alignItems:"center",backgroundColor:Colors.primary,padding:20,borderRadius:10,marginBottom:10}}>
                        <Fontisto name="history" size={32} color="black" />
                        <Text style={{color:"black",fontSize:26,fontStyle:"italic",fontWeight:"900"}}>History</Text>
                        </View>
                        <View style={{gap:20,flexDirection:"row",alignItems:"center",backgroundColor:Colors.primary,padding:20,borderRadius:10,marginBottom:10}}>
                        <Ionicons name="wallet" size={32} color="black" />
                        <Text style={{color:"black",fontSize:26,fontStyle:"italic",fontWeight:"900"}}>Wallet</Text>
                        </View>
                        <View style={{gap:20,flexDirection:"row",alignItems:"center",backgroundColor:Colors.primary,padding:20,borderRadius:10,marginBottom:10}}>
                        <MaterialIcons name="support-agent" size={32} color="black" />
                        <Text style={{color:"black",fontSize:26,fontStyle:"italic",fontWeight:"900"}}>Contact Us</Text>
                        </View>
                    </ScrollView>
                </View>
                <Pressable style={{flex:1,backgroundColor:"white",opacity:0.5}} onPress={() => setModalVisible(false)}>

                </Pressable>
                </View>

            </Modal>
            <Pressable style={styles.iconsContainer} onPress={() => setModalVisible(true)}>
                <Image source={assets.move_logo.light} style={styles.moveLogo}/>
            </Pressable>
            <View style={styles.user}>
                <Text style={{fontStyle:"italic",fontSize:14}}>Good morning</Text>
                <Text style={[styles.username,{color:Colors.primary}]}>John Doe</Text>
            </View>
            <View style={styles.iconsContainer}>
                <Fontisto name="bell-alt" size={32} color="black" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    rootContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:10,
        width:"100%",
    },
    moveLogo:{
        width:70,
        height:70
    },
    user:{
        alignItems:"center",
        justifyContent:"center",
        gap:5,
        textAlign:"center"
    },
    username:{
        color:"black",
        fontStyle:"italic",
        fontWeight:"bold",
        fontSize:26,
        textAlign:"center"
    },
    iconsContainer:{
        width:70,
        justifyContent:"center",
        alignItems:"center"
    }
});