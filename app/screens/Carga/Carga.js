/**
 * @fileoverview Pantalla de carga
 * @requires ../../config/Auth:Auth
 */
import React from "react";

import { View, Text, Image } from "react-native";

import Auth from "../../config/Auth";

/**
 * Pantalla de carga de la aplicación
 * @module Carga
 */
export default class Carga extends React.Component {
  constructor() {
    super();
  }
  /**
   * Espera a que el usuario esté logeado
   */
  cargarAuth = async () => {
    await Auth.isSignedIn(this.props.navigation);
  };

  render() {
    this.cargarAuth();
    return (
      <View>
        <Image source={require("../../assets/splash.png")} />
      </View>
    );
  }
}
