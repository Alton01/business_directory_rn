import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";

export default function Index() {
  return <Redirect href={"/home"} />;
}
