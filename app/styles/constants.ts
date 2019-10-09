
import { Platform, StyleSheet } from "react-native";

export const screenWidth = "80%";

export const primaryBlue = Platform.select({
  ios: "#007aff", // rgb(0, 122, 255)
  android: "#2196f3" // rgb(33, 150, 243)
});