import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetails/Intro";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionButton from "../../components/BusinessDetails/ActionButton";
import About from "../../components/BusinessDetails/About";
import Reviews from "../../components/BusinessDetails/Reviews";

export default function BusinessDetail() {
  const navigation = useNavigation();
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState();
  const [loading, setLoading] = useState(false);

  const getBusinessDetailById = async () => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", businessid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setBusiness({ id: docSnap.id, ...docSnap.data() });
      setLoading(false);
    } else {
      console.log("No such document");
      setLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Business Profile",
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
    });
    getBusinessDetailById();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {loading ? (
          <ActivityIndicator
            size={"large"}
            color={Colors.PRIMARY}
            style={{ marginTop: "70%" }}
          />
        ) : (
          <View>
            <Intro business={business} />
            <ActionButton business={business} />
            <About business={business} />
            <Reviews business={business} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
