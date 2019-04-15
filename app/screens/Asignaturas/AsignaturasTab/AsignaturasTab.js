import React from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  ListView,
  Image,
  TouchableOpacity
} from "react-native";

import styles from "./styles";

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
          renderSeparator={(sectionId, rowId) => (
            <View key={rowId} style={styles.separator} />
          )}
          renderRow={rowData => (
            <TouchableOpacity
              style={styles.asignaturaContainer}
              onPress={() => this.props.navigation.navigate("Asignatura", {
                title: rowData
              })}
              activeOpacity={1}
            >
              <Image
                source={require("../../../../test/imagenes/perfil.jpg")}
                style={styles.asignaturaIcon}
                margin={20}
              />
              <View style={styles.titleContainer}>
                <Text>{rowData}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
