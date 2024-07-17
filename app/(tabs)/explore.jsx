import { View, Text, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import Category from "../../components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

export default function explore() {
  const [businessList, setBusinessList] = useState([]);

  const getBusinessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 25,
              textAlign: "center",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            {" "}
            Explore More{" "}
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: "#fff",
              padding: 10,
              marginVertical: 10,
              marginTop: 15,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: Colors.PRIMARY,
              marginBottom: 30,
            }}
          >
            <FontAwesome name="search-plus" size={24} color={Colors.PRIMARY} />
            <TextInput
              placeholder="Search..."
              style={{
                fontFamily: "outfit",
                fontSize: 16,
              }}
            />
          </View>
          <Category
            explore={true}
            onCategorySelect={(category) => getBusinessByCategory(category)}
          />
          <ExploreBusinessList businessList={businessList} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
