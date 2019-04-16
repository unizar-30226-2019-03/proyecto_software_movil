import { StyleSheet } from "react-native";

export default StyleSheet.create({
  asignaturaContainer: {
  	flex: 1,
  	flexDirection: "row",
  },
  titleContainer: {
    justifyContent: 'center', 
  	flex: 1,
  	marginRight: 15
  },
  title: {
    fontSize: 18,
  },
  asignaturaIcon: {
		width: 70,
		height: 70,
		alignSelf: "flex-start",
		borderRadius: 50,
  }
});