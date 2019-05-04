import React from "react";

import { AsyncStorage } from "react-native";

let userToken = undefined;
let userId = undefined;

export async function signOut(navigation) {
	await AsyncStorage.clear();
	userToken = undefined;
	userId = undefined;
	navigation.navigate("NotLogged");
}

export async function signIn(token, id, navigation) {
	await AsyncStorage.multiSet(
		[["userToken", token], ["userId", id.toString()]],
		null
	);
	userToken = token;
	console.log(userToken);
	userId = id;
	navigation.navigate("Logged");
}

export async function isSignedIn(navigation) {
	await AsyncStorage.multiGet(["userToken", "userId"]).then(response => {
		userToken = response[0][1];
		userId = response[1][1];
	});

	navigation.navigate(userToken ? "Logged" : "NotLogged");
}

export function getUserId() {
	return userId;
}

export function isProfesor() {
	return true;
}

export function getUserToken() {
	return userToken;
}
