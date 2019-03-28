import { Dimensions } from "react-native";

// Constantes globales
export const ScreenWidth = Dimensions.get("window").width;
export const ScreenhHeight = Dimensions.get("window").height;
export const HalfScreenWidth = ScreenWidth / 2.4;

export const FullScreen16_9_Height = (ScreenWidth / 16) * 9;
export const HalfScreen16_9_Height = (HalfScreenWidth / 16) * 9;

export const GrisClaro = "#6F6F70";
export const VerdeClaro = "#12FF00";
