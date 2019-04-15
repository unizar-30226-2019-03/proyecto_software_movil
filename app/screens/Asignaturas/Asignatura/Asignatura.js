import React from "react";
import { Text, View } from "react-native";
import { Input, Image, Button } from "react-native-elements";

import { createAppContainer, createStackNavigator } from "react-navigation";

import styles from "./styles";

export default class Asignatura extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title")
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewSeguirAsignatura}>
          <Button
            buttonStyle={styles.buttonSeguirAsignatura}
            title="Seguir asignatura"
          />
        </View>
        <View style={styles.userView}>
          <Image
		  // TODO: METER REQUIRE()
            source={"../../../test/imagenes/perfil.jpg"}
            style={styles.userIcon}
            margin={20}
          />
          <Text style={styles.userName}>NOMBRE</Text>
        </View>
        <Button
          onPress={() =>
            this.props.navigation.navigate("Chat", {
              title: "Juancho Provisional"
            })
          }
          title="IR A CHAT"
        />
        <Button
          onPress={() => this.props.navigation.navigate("ViendoVideo")}
          title="IR A VIDEO"
        />
      </View>
    );
  }
}
