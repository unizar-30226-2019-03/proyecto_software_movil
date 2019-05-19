import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  rankingTitle: {
    fontWeight: "bold",
    fontSize: 17
  },
  rankingPlace: {
    flex: 1,
    paddingHorizontal: 10,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "lightgrey"
  },
  rankNumberView: {
    flex: 0.2
  },
  rankNumber: {
    fontSize: 17,
    fontWeight: "bold"
  },
  rankScoreView: {
    flex: 0.2,
    marginLeft: "auto"
  },
  rankScore: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "auto"
  },
  trophyView: {
    justifyContent: "center",
    flex: 0.3
  },
  iconoAsignaturaUniversidad: {
    flex: 0.3
  }
});
