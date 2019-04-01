import React from "react";
import { View, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { Image, SearchBar, Button } from "react-native-elements";

import styles from "./styles";

export default class SignUpOne extends React.Component {
  state = {
    searchUni: "",
    searchCarrera: "",
    searchAsign: ""
  };

  static navigationOptions = ({ navigation }) => ({
    title: "Registrarse"
  });

  updateSearchUni = searchUni => {
    this.setState({ searchUni });
  };

  updateSearchCarrera = searchCarrera => {
    this.setState({ searchCarrera });
  };

  updateSearchAsign = searchAsign => {
    this.setState({ searchAsign });
  };

  render() {
    const searchUni = this.state.searchUni;
    const searchCarrera = this.state.searchCarrera;
    const searchAsign = this.state.searchAsign;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.logoView}>
          <Image
            source={require("../../../../assets/icon.png")}
            style={styles.appLogo}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.container07}>
          <View style={styles.inputBoxSeparation}>
            <SearchBar
              placeholder="¿En qué universidad estudias?"
              onChangeText={this.updateSearchUni}
              value={searchUni}
              platform="android"
            />
          </View>
          <View style={styles.inputBoxSeparation}>
            <SearchBar
              placeholder="¿Qué estudias?"
              onChangeText={this.updateSearchCarrera}
              value={searchCarrera}
              platform="android"
            />
          </View>
          <View style={styles.inputBoxSeparation}>
            <SearchBar
              placeholder="¿Qué asignaturas te interesan?"
              onChangeText={this.updateSearchAsign}
              value={searchAsign}
              platform="android"
            />
          </View>
        </View>

        <View style={styles.nextButton}>
          <Button
            onPress={() => this.props.navigation.navigate("Logged")}
            title="Registrarse"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
