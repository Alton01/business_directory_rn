import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { Colors } from "../../constants/Colors";

export default function MyBusiness() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const [businessList, setBusinessList] = useState([]);

  const getUserBusiness = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user?.primaryEmailAddress.emailAddress)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    setLoading(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "My Business",
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
    });
  }, []);

  useEffect(() => {
    user && getUserBusiness();
  }, [user]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            padding: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Your Business Listings
          </Text>
          <FlatList
            onRefresh={getUserBusiness}
            refreshing={loading}
            data={businessList}
            renderItem={({ item, index }) => (
              <BusinessListCard business={item} key={index} />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
