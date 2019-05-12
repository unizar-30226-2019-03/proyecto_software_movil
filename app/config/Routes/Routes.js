import React from "react";

import {
	createStackNavigator,
	createMaterialTopTabNavigator,
	createBottomTabNavigator,
	createAppContainer,
	createSwitchNavigator
} from "react-navigation";

import SearchingScreen from "../../screens/Searching";

import InicioScreen from "../../screens/Inicio";

import AsignaturaScreen from "../../screens/Asignaturas/Asignatura";
import AsignaturasTabScreen from "../../screens/Asignaturas/AsignaturasTab";
import VideosTabScreen from "../../screens/Asignaturas/VideosTab";

import BibliotecaScreen from "../../screens/Biblioteca";
import ListaVideosScreen from "../../screens/Biblioteca/ListaVideos";
import MisListasScreen from "../../screens/Biblioteca/MisListas";
import SubirVideoScreen from "../../screens/Biblioteca/SubirVideo";

import RankingScreen from "../../screens/Ranking";

import MensajesTabScreen from "../../screens/Mensajes/MensajesTab";
import ProfesoresTabScreen from "../../screens/Mensajes/ProfesoresTab";

import ChatScreen from "../../screens/Chat";
import VerPerfilScreen from "../../screens/VerPerfil";
import ViendoVideoScreen from "../../screens/ViendoVideo";
import CuentaScreen from "../../screens/Cuenta";

import SignInScreen from "../../screens/Login/SignIn";
import SignUpOneScreen from "../../screens/Login/SignUp/SignUpOne";
import SignUpTwoScreen from "../../screens/Login/SignUp/SignUpTwo";
import HasOlvidadoContrasenyaScreen from "../../screens/Login/HasOlvidadoContrasenya";

import CargaScreen from "../../screens/Carga";

import SearchMenu from "../../components/SearchMenu";

import EntypoIcons from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import { Azul } from "../../constants";

import { TopTabBarOptions } from "./styles";
import styles from "./styles";

// Inicio

const Inicio = createStackNavigator({
	Inicio: {
		screen: InicioScreen,
		navigationOptions: SearchMenu
	},
	Searching: SearchingScreen,
	Asignatura: AsignaturaScreen
});

// Asignaturas
const AsignaturasTopNav = createMaterialTopTabNavigator(
	{
		AsignaturasTab: {
			screen: AsignaturasTabScreen,
			navigationOptions: {
				tabBarLabel: "ASIGNATURAS"
			}
		},
		VideosTab: {
			screen: VideosTabScreen,
			navigationOptions: {
				tabBarLabel: "VIDEOS"
			}
		}
	},
	TopTabBarOptions
);

AsignaturasTopNav.navigationOptions = SearchMenu;

const Asignaturas = createStackNavigator({
	Asignaturas: AsignaturasTopNav,
	Searching: SearchingScreen,
	Asignatura: AsignaturaScreen
});

// Biblioteca

const Biblioteca = createStackNavigator({
	Biblioteca: {
		screen: BibliotecaScreen,
		navigationOptions: SearchMenu
	},
	ListaVideos: ListaVideosScreen,
	MisListas: MisListasScreen,
	Searching: SearchingScreen,
	Asignatura: AsignaturaScreen
});

// Ranking

const Ranking = createStackNavigator({
	Ranking: {
		screen: RankingScreen,
		navigationOptions: SearchMenu
	},
	Searching: SearchingScreen,
	Asignatura: AsignaturaScreen
});

// Mensajes

const MensajesTopNav = createMaterialTopTabNavigator(
	{
		MensajesTab: {
			screen: MensajesTabScreen,
			navigationOptions: {
				tabBarLabel: "MENSAJES"
			}
		},
		ProfesoresTab: {
			screen: ProfesoresTabScreen,
			navigationOptions: {
				tabBarLabel: "PROFESORES"
			}
		}
	},
	TopTabBarOptions
);

MensajesTopNav.navigationOptions = SearchMenu;

const Mensajes = createStackNavigator({
	Mensajes: MensajesTopNav,
	Searching: SearchingScreen
});

// DownMenu

const DownMenu = createBottomTabNavigator(
	{
		Inicio: Inicio,
		Ranking: Ranking,
		Asignaturas: Asignaturas,
		Mensajes: Mensajes,
		Biblioteca: Biblioteca
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				let IconComponent;
				let iconName;
				if (routeName === "Inicio") {
					IconComponent = MaterialCommunityIcons;
					iconName = "home";
				} else if (routeName === "Ranking") {
					IconComponent = MaterialCommunityIcons;
					iconName = "trophy";
				} else if (routeName === "Asignaturas") {
					IconComponent = EntypoIcons;
					iconName = "graduation-cap";
				} else if (routeName === "Mensajes") {
					IconComponent = SimpleLineIcons;
					iconName = "envelope-letter";
				} else if (routeName === "Biblioteca") {
					IconComponent = MaterialCommunityIcons;
					iconName = "folder";
				}
				return <IconComponent name={iconName} style={styles.downMenuIcon} color={tintColor} />;
			}
		}),
		navigationOptions: {
			header: null
		},
		tabBarOptions: {
			activeTintColor: Azul,
			inactiveTintColor: "gray"
		}
	}
);

// App

const Logged = createStackNavigator({
	TopBarScreens: {
		screen: DownMenu,
		headerMode: "none"
	},
	Chat: ChatScreen,
	SubirVideo: SubirVideoScreen,
	VerPerfil: VerPerfilScreen,
	ViendoVideo: {
		screen: ViendoVideoScreen,
		navigationOptions: {
			header: null
		}
	},
	Cuenta: CuentaScreen
});

const NotLogged = createStackNavigator({
	SignIn: {
		screen: SignInScreen,
		navigationOptions: {
			header: null
		}
	},
	SignUpOne: SignUpOneScreen,
	SignUpTwo: SignUpTwoScreen,
	HasOlvidadoContrasenya: HasOlvidadoContrasenyaScreen
});

export default createAppContainer(
	createSwitchNavigator(
		{
			NotLogged: {
				screen: NotLogged,
				navigationOptions: {
					header: null
				}
			},
			Logged: {
				screen: Logged,
				navigationOptions: {
					header: null
				}
			},
			Carga: {
				screen: CargaScreen,
				navigationOptions: {
					header: null
				}
			}
		},
		{
			initialRouteName: "Carga"
		}
	)
);
