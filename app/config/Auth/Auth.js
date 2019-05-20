import React from "react";

import { AsyncStorage } from "react-native";

import { UserApi, ApiClient } from "swagger_unicast";

import { observer } from "mobx-react/native";

import PerfilStore from "../PerfilStore";

import HaOcurridoUnError from "../../components/HaOcurridoUnError";

@observer
export default class Auth {
	static userToken = undefined;
	static userId = undefined;
	static professor = undefined;

	static getUserData(navigation, response_callback) {
		let defaultClient = ApiClient.instance;
		let bearerAuth = defaultClient.authentications["bearerAuth"];
		bearerAuth.accessToken = userToken;

		let apiInstance = new UserApi();
		let opts = {
			cacheControl: "no-cache, no-store, must-revalidate",
			pragma: "no-cache",
			expires: 0
		};
		apiInstance.getUser(userId, opts, (error, data, response) => {
			if (response_callback) {
				response_callback();
			}
			if (error) {
				if (error.status == 403) {
					navigation.navigate("NotLogged");
				} else {
					HaOcurridoUnError(getUserData(navigation, response_callback));
				}
			} else {
				professor = data.role == "ROLE_PROFESSOR" ? true : false;
				console.log(data);
				PerfilStore.setImagenPerfil(data.photo);
				PerfilStore.setUserName(data.username);
				navigation.navigate("Logged");
			}
		});
	}

	static async signOut(navigation) {
		await AsyncStorage.clear();
		userToken = undefined;
		userId = undefined;
		navigation.navigate("NotLogged");
	}

	static async signIn(token, id, navigation, response_callback) {
		await AsyncStorage.multiSet([["userToken", token], ["userId", id.toString()]], null);
		userToken = token;
		userId = id;

		this.getUserData(navigation, response_callback);
	}

	static async isSignedIn(navigation) {
		await AsyncStorage.multiGet(["userToken", "userId"]).then(response => {
			userToken = response[0][1];
			userId = response[1][1];
		});

		console.log("EL TOKEN: ",userToken);
		console.log(userId);

		if (userToken) {
			this.getUserData(navigation, null);
		} else {
			navigation.navigate("NotLogged");
		}
	}

	static getUserId() {
		return userId;
	}

	static isProfesor() {
		return professor;
	}

	static getUserToken() {
		return userToken;
	}
}
