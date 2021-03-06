/**
 * @fileoverview Imagen de perfil de un usario
 * @requires ../../config/PerfilStore:PerfilStore
 */
import React from "react";
import { View, TouchableOpacity, ActivityIndicator, Image } from "react-native";

import PerfilStore from "../../config/PerfilStore";
import { observer } from "mobx-react/native";

/**
 * @param {Object} props props para renderizar el componente
 * 		props.style Estilo
 * @module ImagenPerfil
 *
 *
 */
@observer
export default class ImagenPerfil extends React.Component {
  render() {
    const imagenPerfil = PerfilStore.imagenPerfil;
    return (
      <View>
        {imagenPerfil == "" ? (
          <View style={[this.props.style, { justifyContent: "center" }]}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <Image
            key={imagenPerfil}
            source={{ uri: imagenPerfil }}
            style={this.props.style}
          />
        )}
      </View>
    );
  }
}
