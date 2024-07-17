import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google'});

    const onPressAuth = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =  await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId})
            } else {

            }
        } catch (err) {
            console.error("OAuth error", err)
        }
    }, [])

  return (
    <SafeAreaView>
        <ScrollView>
    <View>
        <View style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 30
        }}>
      <Image source={require('./../assets/images/login.png')}
      style={{ 
        width: 250,
        height: 450,
        borderRadius: 20,
        borderWidth: 6,
        borderColor: '#000'
      }} />
      </View>
      <View style={{
        backgroundColor: '#fff',
        padding: 20,
        marginTop: -20
      }}>
        <Text style={{
            fontSize: 30,
            fontFamily: 'outfit-bold',
            textAlign: 'center'
        }}>Your Ultimate {''}
            <Text style={{
                color: Colors.PRIMARY
            }} >Community Business Directory {''}</Text> 
         App </Text>
         <Text style={{
            fontSize: 15,
            fontFamily:'outfit',
            textAlign: 'center',
            marginVertical: 15,
            color: Colors.GRAY
         }} >
            Find your favorite business near you and post your own business to your community!
         </Text>

         <TouchableOpacity style={styles.btn} onPress={onPressAuth}>
            <Text style={{
                textAlign: 'center',
                color: '#fff',
                fontFamily: 'outfit'
            }}>Get Started</Text>
         </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 99,
        marginTop: 20
    }
})