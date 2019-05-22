import { StyleSheet } from "react-native";

import { Azul } from "../../../constants";

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
    marginBottom: 2
  },
  textAsignaturaErr: {
    fontSize: 18,
    marginBottom: 2,
    color: "red"
  },
  collegeName: {
    marginLeft: 10,
    fontSize: 16,
    color: "blue",
    textAlign: "right",
    flex: 1
  },
  header: {
    fontSize: 19,
    color: "white"
  },
  listRow: {
    flex: 1,
    paddingVertical: 9
  },
  rowText: {
    marginLeft: 5,
    fontSize: 17
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
    fontSize: 17
  },
  buttonColor: {
    backgroundColor: Azul
  }
});
