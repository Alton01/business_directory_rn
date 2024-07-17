import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from "expo-font";

export default function Index() {

  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    Font.loadAsync({
      "outfit": require("../assets/fonts/Outfit-Regular.ttf"),
      'outfit-medium':require('../assets/fonts/Outfit-Medium.ttf'),
      'outfit-bold':require('../assets/fonts/Outfit-Bold.ttf')
    })
    .then(() => {
     setFontLoaded(true)
    }) 
  }, [])

  if (!fontLoaded) return null
  return (
     <Redirect href={'/home'} />
  );
}

