import React from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { ListItem, Icon } from "react-native-elements";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

import styles from "./styles";
import IconoAsignaturaUniversidad from "../../components/IconoAsignaturaUniversidad";

export default class Ranking extends React.Component {
  state = {
    filter: "Por universidad"
  };

  enableFilter(name) {
    this.setState({ filter: name });
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
        <View style={styles.viewFilter}>
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
                    name: item.name == this.state.filter ? "check" : ""
                  }}
                  onPress={() => this.enableFilter(item.name)}
                />
              ))}
            </MenuOptions>
          </Menu>
        </View>

        <ScrollView>
          <View style={styles.rankingPlace}>
            <Text style={styles.rankNumber}>1.</Text>
			<IconoAsignaturaUniversidad
				name="Multiprocesadores"
				image={require("../../../test/imagenes/perfil_uni.jpg")}
			/>
			<Icon
				name="trophy"
				type="font-awesome"
				color="gold"
			/>
			<Text style={styles.rankScore}>99.98%</Text>
          </View>
		  <View style={styles.rankingPlace}>
            <Text style={styles.rankNumber}>1.</Text>
			<IconoAsignaturaUniversidad
				name="Multiprocesadores"
				image={require("../../../test/imagenes/perfil_uni.jpg")}
			/>
			<Icon
				name="trophy"
				type="font-awesome"
				color="silver"
			/>
			<Text style={styles.rankScore}>99.98%</Text>
          </View>
		  <View style={styles.rankingPlace}>
            <Text style={styles.rankNumber}>1.</Text>
			<IconoAsignaturaUniversidad
				name="Multiprocesadores"
				image={require("../../../test/imagenes/perfil_uni.jpg")}
			/>
			<Icon
				name="trophy"
				type="font-awesome"
				color="brown"
			/>
			<Text style={styles.rankScore}>99.98%</Text>
          </View>
		  <View style={styles.rankingPlace}>
            <Text style={styles.rankNumber}>1.</Text>
			<IconoAsignaturaUniversidad
				name="Multiprocesadores"
				image={require("../../../test/imagenes/perfil_uni.jpg")}
			/>
			<Icon
				name=""
				type="font-awesome"
				color="yellow"
			/>
			<Text style={styles.rankScore}>99.98%</Text>
          </View>
        </ScrollView>

        <Button
          onPress={() =>
            this.props.navigation.navigate("Asignatura", {
              title: "UPM - Proyecto software"
            })
          }
          title="IR A ASIGNATURA CONCRETA"
        />
      </View>
    );
  }
}
