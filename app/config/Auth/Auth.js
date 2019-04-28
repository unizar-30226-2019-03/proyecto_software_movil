import React from "react";

import { AsyncStorage } from "react-native";

let userToken = undefined;

export async function signOut(navigation) {
	await AsyncStorage.clear();
	userToken = undefined;
	navigation.navigate("NotLogged");
}

export async function signIn(token, navigation) {
	await AsyncStorage.setItem("userToken", token);
	userToken = token;
	navigation.navigate("Logged");
}

export async function isSignedIn(navigation) {
	userToken = await AsyncStorage.getItem("userToken");
	navigation.navigate(userToken ? "Logged" : "NotLogged");
}

export function getUserToken() {
	return userToken;
}
