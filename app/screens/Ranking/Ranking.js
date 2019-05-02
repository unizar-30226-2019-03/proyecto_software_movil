import React from "react";
import { Text, View, Button, ScrollView, TouchableOpacity } from "react-native";
import { ListItem, Icon, SearchBar } from "react-native-elements";

import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";

import styles from "./styles";
import IconoAsignaturaUniversidad from "../../components/IconoAsignaturaUniversidad";

export default class Ranking extends React.Component {
  state = {
    filter: "Por universidad",
    search: ""
  };

  enableFilter(name) {
    this.setState({ filter: name });
  }

  handleSearch(text) {
    this.setState({ search:text });
    if (text != "") {
      //buscar en la API
    }
  }

  render() {
    const optionList = [
      {
        name: "Por comunidad"
      },
      {
        name: "Por universidad"
      },
      {
        name: "Por profesor"
      }
    ];

    return (
      <View style={styles.container}>
{/*        <View style={styles.viewFilter}>
          <Text style={styles.rankingTitle}>{this.state.filter}</Text>
          <SearchBar
            value={this.state.search}
            onChangeText={(text) => this.handleSearch(text)}
            lightTheme={true}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBar}
            round={true}
          />
          <Menu style={styles.dropDownMenuContainer}>
            <MenuTrigger>
              <Icon name="filter" type="font-awesome" size={30} color="grey" />
            </MenuTrigger>
            <MenuOptions>
              {optionList.map((item, i) => (
                <ListItem
                  key={i}
                  title={item.name}
                  titleStyle={[
                    {
                      fontWeight:
                        item.name == this.state.filter ? "bold" : "normal"
                    }
                  ]}
                  leftIcon={{
                    type: "entypo",
                    name: item.name == this.state.filter ? "check" : undefined
                  }}
                  onPress={() => this.enableFilter(item.name)}
                />
              ))}
            </MenuOptions>
          </Menu>
        </View>*/}

        <ScrollView>
          <View style={styles.rankingPlace}>
            <Text style={styles.rankNumber}>1.</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Asignatura", {
                  title: "UPM - Proyecto software"
                })
              }
            >
              <IconoAsignaturaUniversidad
                name="Multiprocesadores"
                image={require("../../../test/imagenes/perfil_uni.jpg")}
              />
            </TouchableOpacity>
            <Icon name="trophy" type="font-awesome" color="gold" />
            <Text style={styles.rankScore}>99.98%</Text>
          </View>
          <View style={styles.rankingPlace}>
            <Text style={styles.rankNumber}>2.</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Asignatura", {
                  title: "UPM - Proyecto software"
                })
              }
            >
              <IconoAsignaturaUniversidad
                name="Multiprocesadores"
                image={require("../../../test/imagenes/perfil_uni.jpg")}
              />
            </TouchableOpacity>
            <Icon name="trophy" type="font-awesome" color="silver" />
            <Text style={styles.rankScore}>99.93%</Text>
          </View>
          <View style={styles.rankingPlace}>
            <Text style={styles.rankNumber}>3.</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Asignatura", {
                  title: "UPM - Proyecto software"
                })
              }
            >
              <IconoAsignaturaUniversidad
                name="Multiprocesadores"
                image={require("../../../test/imagenes/perfil_uni.jpg")}
              />
            </TouchableOpacity>
            <Icon name="trophy" type="font-awesome" color="brown" />
            <Text style={styles.rankScore}>98.10%</Text>
          </View>
          <View style={styles.rankingPlace}>
            <Text style={styles.rankNumber}>4.</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Asignatura", {
                  title: "UPM - Proyecto software"
                })
              }
            >
              <IconoAsignaturaUniversidad
                name="Multiprocesadores"
                image={require("../../../test/imagenes/perfil_uni.jpg")}
              />
            </TouchableOpacity>
            <View style={styles.hidden}>
              <Icon name="trophy" type="font-awesome" />
            </View>
            <Text style={styles.rankScore}>85.77%</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
