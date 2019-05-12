import React from "react";

import { AsyncStorage } from "react-native";

import { observer } from "mobx-react/native";

import ImagenPerfilStore from "../ImagenPerfil";

@observer
export default class Auth {
	static userToken = undefined;
	static userId = undefined;

	static async signOut(navigation) {
		await AsyncStorage.clear();
		userToken = undefined;
		userId = undefined;
		navigation.navigate("NotLogged");
	}

	static async signIn(token, id, navigation) {
		await AsyncStorage.multiSet([["userToken", token], ["userId", id.toString()]], null);
		userToken = token;
		userId = id;

		ImagenPerfilStore.reload();

		navigation.navigate("Logged");
	}

	static async isSignedIn(navigation) {
		await AsyncStorage.multiGet(["userToken", "userId"]).then(response => {
			userToken = response[0][1];
			userId = response[1][1];
		});

		console.log(userToken);
		console.log(userId);

		if (userToken) {
			ImagenPerfilStore.reload();
		}

		navigation.navigate(userToken ? "Logged" : "NotLogged");
	}

	static getUserId() {
		return userId;
	}

	static isProfesor() {
		return true;
	}

	static getUserToken() {
		return userToken;
	}
}
