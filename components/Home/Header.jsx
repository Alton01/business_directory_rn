import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from '../../constants/Colors'
import { FontAwesome } from '@expo/vector-icons';

export default function Header() {

    const {user} = useUser()

  return (
    <View style={{
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
       alignItems: 'center',
       gap: 10      
      }}>
        <Image
        source={{ uri: user?.imageUrl}} 
        style={{
            width: 45,
            height: 45,
            borderRadius: 99
        }} />
        <View>
            <Text style={{
                color: '#fff'
            }}> Welcome{''}</Text>
            <Text style={{
                fontSize: 19,
                fontFamily: 'outfit-medium',
                color: '#fff'
            }} >{user?.fullName}</Text>
        </View>
      </View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
       alignItems: 'center',
       gap: 10,
       backgroundColor: '#fff',
       padding:10,
       marginVertical: 10,
       marginTop: 15,
       borderRadius: 8       
      }} >
            <FontAwesome name="search-plus" size={24} color={Colors.PRIMARY} />
            <TextInput placeholder='Search...'
            style={{
                fontFamily: 'outfit',
                fontSize: 16
            }} />
        </View>
    </View>
  )
}