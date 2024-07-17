import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularBusiness from '../../components/Home/PopularBusiness'

export default function home() {
  return (
   <SafeAreaView>
    <ScrollView>
      <View>
       
          <Header />
       
          <Slider />
  
          <Category />
        
        <PopularBusiness />
      </View>
    </ScrollView>
   </SafeAreaView>
  )
}