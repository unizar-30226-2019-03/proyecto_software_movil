import React from "react";
import { View, ListView } from "react-native";

import styles from "./styles";

import ThumbnailAsignatura from "../../../components/ThumbnailAsignatura";

export default class AsignaturasTab extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows([
        "Asignatura numero 1",
        "Asignatura mas larga numero 2",
        "Asignatura mucho mas daawwwwwwwwwwwwwwwmas mas mas larga",
        "4",
        "5",
        "6",
        "7",
        "8"
      ])
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData => (
            <ThumbnailAsignatura
              navigation={this.props.navigation}
              icon={require("../../../../test/imagenes/perfil_uni.jpg")}
              name={rowData}
            />
          )}
        />
      </View>
    );
  }
}
