import { Dimensions } from "react-native";
import { Header } from "react-navigation";
import { StatusBar } from "react-native";

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
export const GrisFondoBarraBusqueda = "#F4F4F4";
export const Azul = "#235da9";

export const PeriodoNotificaciones = 5000;

export const HeaderHeight = Header.HEIGHT + StatusBar.currentHeight;
