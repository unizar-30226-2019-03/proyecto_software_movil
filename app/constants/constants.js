import { Platform } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Dimensions } from "react-native";

// Constantes globales
export const ScreenWidth = Dimensions.get("window").width;
export const ScreenhHeight = Dimensions.get("window").height;
export const HalfScreenWidth = ScreenWidth / 2.4;

export const FullScreen16_9_Height = (ScreenWidth / 16) * 9;
export const HalfScreen16_9_Height = (HalfScreenWidth / 16) * 9;

export const GrisClaro = "#6F6F70";
export const VerdeClaro = "#12FF00";
export const RojoClaro = "#F90501";
export const GrisChat = "#ECECEC";
export const VerdeChat = "#DCF8C6";
export const AzulNuevaLista = "#2E5FD4";

export const isIOS = Platform.OS === "ios";

export const statusBarHeight = isIOS ? ifIphoneX(44, 20) : 0;
export const navBarHeight = isIOS ? 44 : 56;
export const headerHeight = statusBarHeight + navBarHeight;
