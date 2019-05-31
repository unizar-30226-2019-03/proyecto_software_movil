/**
 * @fileoverview Funciones de permisos de usuario
 * @author Unicast
 * @requires swagger_unicast:UserApi
 * @requires swagger_unicast:ApiClient
 * @requires ../PerfilStore:PerfilStore
 * @requires ../../components/HaOcurridoUnError:HaOcurridoUnError
 *
 */
import React from "react";

import { AsyncStorage } from "react-native";

import { UserApi, ApiClient } from "swagger_unicast";

import UnicastNotifications from "../UnicastNotifications";

import PerfilStore from "../PerfilStore";

import HaOcurridoUnError from "../../components/HaOcurridoUnError";

/**
 * Funciones de la api de usuario
 * @module Auth
 */
export default class Auth {
  static userToken = undefined;
  static userId = undefined;
  static professor = undefined;

  /**
   * Obtiene los datos de un usuario y lo lleva a la pantalla de logeado
   * @param {Object} navigation datos de navegacion
   * @param {Object} response_callback callback en caso de error
   */
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
        UnicastNotifications.fireSingleton();
        navigation.navigate("Logged");
      }
    });
  }
  /**
   * Cierra la sesion del usuario
   * @param {Object} navigation datos de navegacion
   */
  static async signOut(navigation) {
    UnicastNotifications.killSingleton();
    await AsyncStorage.clear();
    userToken = undefined;
    userId = undefined;
    navigation.navigate("NotLogged");
  }
  /**
   * Logea a un usuario
   * @param {Object} token Token de permisos del usuario
   * @param {Number} id id del usuario
   * @param {Object} navigation datos de navegacion
   * @param {Function} response_callback callback en caso de error
   */
  static async signIn(token, id, navigation, response_callback) {
    await AsyncStorage.multiSet(
      [["userToken", token], ["userId", id.toString()]],
      null
    );
    userToken = token;
    userId = id;

    this.getUserData(navigation, response_callback);
  }
  /**
   *
   * @param {Object} navigation Datos de navegacionm
   * @return {Boolean} Si el usuario esta logead
   */
  static async isSignedIn(navigation) {
    await AsyncStorage.multiGet(["userToken", "userId"]).then(response => {
      userToken = response[0][1];
      userId = response[1][1];
    });

    console.log("EL TOKEN: ", userToken);
    console.log("USER ID: ", userId);

    if (userToken) {
      this.getUserData(navigation, null);
    } else {
      navigation.navigate("NotLogged");
    }
  }

  /**
   * @return {Number} id de usuario
   */
  static getUserId() {
    return userId;
  }

  /**
   * @return {Boolean} si el usuario es un profesor
   */
  static isProfesor() {
    return professor;
  }
  /**
   * @return {Object} Token del usuario
   */
  static getUserToken() {
    return userToken;
  }
}
