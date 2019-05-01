import React from "react";
import { View, Animated } from "react-native";
import { Input, Button, Text, Overlay } from "react-native-elements";

import MoverInputEncimaTeclado from "../../../components/MoverInputEncimaTeclado";

import styles from "./styles";

export default class HasOlvidadoContrasenya extends React.Component {
  state = {
    shift: new Animated.Value(0),
    emailSent: false
  };

  componentWillMount() {
    this.moverInputEncimaTeclado = new MoverInputEncimaTeclado();
  }

  componentWillUnmount() {
    this.moverInputEncimaTeclado.delete();
  }

  toggleEmailSent = () => {
    this.setState({ emailSent: !this.state.emailSent });
  };

  render() {
    return (
      <Animated.ScrollView
        style={[
          styles.container,
          {
            transform: [{ translateY: this.moverInputEncimaTeclado.getShift() }]
          }
        ]}
      >
        <Overlay
          isVisible={this.state.emailSent}
          overlayStyle={styles.overlayStyle}
          animationType="fade"
          onBackdropPress={() => this.toggleEmailSent()}
        >
          <View style={styles.alertContainer}>
            <Text style={styles.alertHeader}>¡Éxito!</Text>
            <Text style={styles.alertText}>
              Hemos enviado un email a su dirección de
              correo / nombre de usuario.
            </Text>
            <Button
              title="OK"
              containerStyle={styles.buttonOk}
              onPress={() => this.toggleEmailSent()}
            />
          </View>
        </Overlay>

        <View style={styles.viewGeneral}>
          <View style={styles.viewInput}>
            <Input
              label="Introduzca su nombre de usuario o correo electrónico"
							placeholder="Escriba aquí..."
							onSubmitEditing={() => this.toggleEmailSent()}
            />
          </View>
          <View style={styles.viewButton}>
            <Button
              title="Enviar correo"
              containerStyle={styles.button}
              onPress={() => this.toggleEmailSent()}
            />
          </View>
        </View>
      </Animated.ScrollView>
    );
  }
}
