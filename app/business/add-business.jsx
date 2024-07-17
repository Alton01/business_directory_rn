import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db, storage } from "./../../configs/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const { user } = useUser();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [website, setWebsite] = useState();
  const [about, setAbout] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);

  const getCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
    });
    getCategoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage(result?.assets[0].uri);
  };

  const onAddNewBusiness = async () => {
    setLoading(true);
    const fileName = Date.now().toString() + ".jpg";
    const resp = await fetch(image);
    const blob = await resp.blob();
    const imageRef = ref(storage, "business-app/" + fileName);

    uploadBytes(imageRef, blob)
      .then((snapshot) => {
        console.log("File uploaded....");
      })
      .then((resp) => {
        getDownloadURL(imageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          saveBusinessDetail(downloadUrl);
        });
      });
    setLoading(false);
  };

  const saveBusinessDetail = async (imageUrl) => {
    if (
      !name ||
      !address ||
      !contact ||
      !about ||
      !website ||
      !category ||
      !image
    ) {
      setLoading(false);
      ToastAndroid.show(
        "Please fill data into the empty fields",
        ToastAndroid.LONG
      );
      return;
    }
    await setDoc(doc(db, "BusinessList", Date.now().toString()), {
      name: name,
      address: address,
      contact: contact,
      about: about,
      website: website,
      category: category,
      username: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      imageUrl: imageUrl,
    });
    setLoading(false);
    ToastAndroid.show(
      "Your Business Listing Has Been Added..",
      ToastAndroid.LONG
    );
    router.push("/home");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Add New Business
          </Text>
          <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
            Fill in all the details in order to add a new business.
          </Text>
          <TouchableOpacity
            onPress={() => onImagePick()}
            style={{
              marginTop: 20,
            }}
          >
            {!image ? (
              <Image
                source={require("./../../assets/images/placeholder.png")}
                style={{ width: 100, height: 100, marginBottom: 15 }}
              />
            ) : (
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 15,
                  marginBottom: 25,
                }}
              />
            )}
          </TouchableOpacity>

          <View>
            <TextInput
              placeholder="Business Name"
              onChangeText={(v) => setName(v)}
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                fontSize: 17,
                backgroundColor: "#fff",
                marginTop: 10,
                borderColor: "#000",
                fontFamily: "outfit",
              }}
            />
            <TextInput
              placeholder="Business Address"
              onChangeText={(v) => setAddress(v)}
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                fontSize: 17,
                backgroundColor: "#fff",
                marginTop: 10,
                borderColor: "#000",
                fontFamily: "outfit",
              }}
            />
            <TextInput
              placeholder="Business Contact"
              onChangeText={(v) => setContact(v)}
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                fontSize: 17,
                backgroundColor: "#fff",
                marginTop: 10,
                borderColor: "#000",
                fontFamily: "outfit",
              }}
            />
            <TextInput
              placeholder="Business Website"
              onChangeText={(v) => setWebsite(v)}
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                fontSize: 17,
                backgroundColor: "#fff",
                marginTop: 10,
                borderColor: "#000",
                fontFamily: "outfit",
              }}
            />
            <TextInput
              multiline
              numberOfLines={4}
              placeholder="About"
              onChangeText={(v) => setAbout(v)}
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                fontSize: 17,
                backgroundColor: "#fff",
                marginTop: 10,
                borderColor: "#000",
                fontFamily: "outfit",
                height: 100,
              }}
            />
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginTop: 10,
                borderColor: "#000",
              }}
            >
              <RNPickerSelect
                onValueChange={(value) => setCategory(value)}
                items={categoryList}
              />
            </View>
          </View>
          <TouchableOpacity
            disabled={loading}
            onPress={() => onAddNewBusiness()}
            style={{
              padding: 10,
              backgroundColor: Colors.PRIMARY,
              borderRadius: 15,
              marginTop: 20,
            }}
          >
            {loading ? (
              <ActivityIndicator size={"large"} color={"#fff"} />
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "outfit-medium",
                  color: "#fff",
                }}
              >
                Add New Business
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
