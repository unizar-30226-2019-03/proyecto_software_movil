import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1
  },
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
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  asignaturaIcon: {
		width: 50,
		height: 50,
		alignSelf: "flex-start",
		borderRadius: 50,
  }
});
