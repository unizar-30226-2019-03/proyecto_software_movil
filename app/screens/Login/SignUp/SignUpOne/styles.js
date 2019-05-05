import { StyleSheet } from "react-native";

import { Azul } from "../../../../constants";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  logoView: {
    paddingHorizontal: 60,
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  appLogo: {
    width: 100,
    height: 100
  },
  inputBoxSeparation: {
    paddingHorizontal: 40,
    paddingBottom: 30
  },
  inputSeparation: {
    paddingRight: 10
  },
  inputSeparationInfo: {
    paddingRight: 15
  },
  viewImageContainer: {
    paddingHorizontal: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10
  },
  profPic: {
    width: 85,
    height: 85,
    borderRadius: 85
  },
  imageErrText: {
    color: "red",
    borderWidth: 1,
    borderColor: "red",
    padding: 5,
    borderRadius: 2
  },
  profPicButton: {
    width: 150
  },
  viewSelectAsign: {
    paddingHorizontal: 50,
    paddingTop: 8,
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textAsignatura: {
    fontSize: 18,
    marginBottom: 2,
  },
  textAsignaturaErr: {
    fontSize: 18,
    marginBottom: 2,
    color: "red",
  },
  collegeName: {
    fontSize: 16,
    color: "blue",
    textAlign: "left",
    maxWidth: 160,
  },
  listRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    width: 270,
    paddingTop: 6,
    paddingBottom: 12,
  },
  rowText: {
    fontSize: 17,
  },
  overlayStyle: {
		justifyContent: "center",
		alignItems: "center"
	},
  pickerAsign: {
    width: 200,
    color: Azul
  },
  descriptionContainer: {
    paddingHorizontal: 40,
    paddingBottom: 40
  },
  viewNextButton: {
    paddingRight: 20,
    alignItems: "flex-end",
    paddingBottom: 20
  },
  nextButton: {
    width: 140
  },
  nextText: {
		fontSize: 17,
	},
  buttonColor: {
    backgroundColor: Azul
  }
});
