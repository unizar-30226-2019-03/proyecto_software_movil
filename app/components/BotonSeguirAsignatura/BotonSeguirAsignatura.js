import React from "react";
import { Button } from "react-native-elements";

import styles from "./styles";

export default class BotonSeguirAsignatura extends React.Component {
  state = {
    asignaturaSeguida: false
  };

  render() {
    return (
      <Button
        buttonStyle={styles.buttonSeguirAsignatura}
        title={this.state.asignaturaSeguida ? "Siguiendo" : "Seguir asignatura"}
        type={this.state.asignaturaSeguida ? "outline" : "solid"}
        onPress={() =>
          this.setState({ asignaturaSeguida: !this.state.asignaturaSeguida })
        }
      />
    );
  }
}
