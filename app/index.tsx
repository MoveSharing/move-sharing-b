import { useColors } from "@/hooks/useColors";
import React from "react";
import { Button, View, StyleSheet, SafeAreaView,Text } from "react-native";


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
        <SafeAreaView>
            <Text style={{color:Colors.secondary}}>Home</Text>
        </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   signOutButton: {
//     alignSelf: "flex-end",
//   },
// });

export default Index;