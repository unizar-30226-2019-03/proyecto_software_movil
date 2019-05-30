/**
 * @fileoverview Indicador de carga
 * @author Unicast
 */
import React from "react";
import { View, ActivityIndicator } from "react-native";

import styles from "./styles";

/**
 *
 * @param {Object} props props para renderizar  el componente
 * 		props.show indica si se tiene que monstrar
 */
const LoadingFooter = props => {
  return (
    <View>
      {props.show ? (
        <ActivityIndicator size="large" style={styles.footer} />
      ) : null}
    </View>
  );
};

export default LoadingFooter;
