import React from "react";
import { Text, View, Button, ScrollView, ListView } from "react-native";

import styles from "./styles";
import ThumbnailAsignatura from "../../../components/ThumbnailAsignatura";
import IconoAsignaturaUniversidad from "../../../components/IconoAsignaturaUniversidad";
export default class AsignaturasTab extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(["1", "2", "3", "4", "5", "6", "7", "8"])
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
              asignatura={rowData}
            />
          )}
        />
      </View>
    );
  }
}
