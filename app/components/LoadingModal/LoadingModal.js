/**
 * @fileoverview Modal de carga
 */
import React from "react";
import { View, ActivityIndicator, Modal } from "react-native";

import styles from "./styles";
/**
 *
 * @param {Object} props props para renderizar el componente
 * 		props.visible indica si el modal tiene que ser visible.
 */
const LoadingModal = props => {
  console.log(props.visible);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => null}
      >
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      </Modal>
    </View>
  );
};

export default LoadingModal;
