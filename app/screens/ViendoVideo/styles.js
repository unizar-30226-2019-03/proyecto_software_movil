import { StyleSheet } from "react-native";
import { FullScreenWidth, FullScreen16_9_Height } from "../../constants";
export default StyleSheet.create({
  headerContainer: {
    flexDirection: "row"
  },
  container: {
    flex: 1
  },
  videoContainer: {
    width: FullScreenWidth,
    height: FullScreen16_9_Height,
    borderWidth: 2
  }
});
