import { Dimensions, Platform } from "react-native";

export const deviceScreenHeight = Math.round(Dimensions.get('window').height);
export const deviceScreenWidth = Math.round(Dimensions.get('window').width);
export const mainColorForProfile = '#01C89E';
export const primaryBlue = Platform.select({
  ios: "#007aff", // rgb(0, 122, 255)
  android: "#2196f3" // rgb(33, 150, 243)
});
export const primaryButtonColor = "#6200ee";
export const primaryGreen= "#43a048";
export const primaryRed = "#e53935";
export const primaryYellow = "#fdd835";
export const screenWidth = "80%";

export const buttonWidth = deviceScreenWidth * 0.8 * 0.75;
