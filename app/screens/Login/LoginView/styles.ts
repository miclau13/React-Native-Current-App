import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  imageContainer: {
    alignSelf: "center",
    height: 50, 
    width: 50, 
  },
  nextButton: {
    alignSelf: "center",
    borderRadius: 20,
    width: "75%",
  },
  viewBox1: {
    flex: 1,
  },
  viewBox2: {
    flex: 0.5,
  },
  viewBox3: {
    flex: 5,
  },
});

export default styles;