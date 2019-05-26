import React from "react";

import { AsyncStorage } from "react-native";

import { UserApi, ApiClient } from "swagger_unicast";

import UnicastNotifications from "../UnicastNotifications";

import PerfilStore from "../PerfilStore";

import HaOcurridoUnError from "../../components/HaOcurridoUnError";

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
          HaOcurridoUnError(this.getUserData(navigation, response_callback));
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
    UnicastNotifications.killSingleton();
    await AsyncStorage.clear();
    userToken = undefined;
    userId = undefined;
    navigation.navigate("NotLogged");
  }

  static async signIn(token, id, navigation, response_callback) {
    await AsyncStorage.multiSet([["userToken", token], ["userId", id.toString()]], null);
    userToken = token;
    userId = id;

    UnicastNotifications.fireSingleton();
    this.getUserData(navigation, response_callback);
  }

  static async isSignedIn(navigation) {
    await AsyncStorage.multiGet(["userToken", "userId"]).then(response => {
      userToken = response[0][1];
      userId = response[1][1];
    });

    console.log("EL TOKEN: ", userToken);
    console.log("USER ID: ", userId);

    UnicastNotifications.fireSingleton();
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
