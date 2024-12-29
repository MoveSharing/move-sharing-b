import { Stack } from "expo-router";
import React from "react";
import { Button, View, StyleSheet, SafeAreaView,Text } from "react-native";
import {Tabs} from "expo-router";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import outputs from "../amplify_outputs.json";
import Feather from '@expo/vector-icons/Feather';
import MainScreenHeader from "@/components/headers/MainScreenHeader";
import { useColors } from "@/hooks/useColors";
Amplify.configure(outputs);
export default function RootLayout() {
  const Colors=useColors();
  return (
    <Authenticator.Provider>
      <Authenticator>
        <Tabs screenOptions={{
          tabBarActiveTintColor:Colors.primary ,
          tabBarStyle:{
            backgroundColor:Colors.secondary,
            borderTopLeftRadius:20,
            borderTopRightRadius:20,
            height:60,
            paddingTop:7
          },
          tabBarLabelStyle:{fontSize:12,fontFamily:"Inter-Bold"},
        }}>
          <Tabs.Screen name="index" options={{
            title: "Home",
            tabBarIcon: ({color}) => (<Feather name="home" size={28} color={color}/>),
            header: () => <MainScreenHeader />,
           }} />
          <Tabs.Screen name="explore" options={{ title: "Explore",
            tabBarIcon: ({color}) => (<Feather name="map" size={28} color={color} />)
           }} />
        </Tabs>
      </Authenticator>
    </Authenticator.Provider>
  )
    
}
