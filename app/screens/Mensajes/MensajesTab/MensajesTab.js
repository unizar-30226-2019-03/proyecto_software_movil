import React from "react";
import { Text, TouchableOpacity, ScrollView, View } from "react-native";
import { Image } from "react-native-elements";

import styles from "./styles";

const samplePic =
  "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";

export default class MensajesTab extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.chatContainer}
          onPress={() =>
            this.props.navigation.navigate("Chat", {
              title: "Matilde P."
            })
          }
        >
          <Image source={{ uri: samplePic }} style={styles.profilePic} />
          <View style={styles.nameAndMsgContainer}>
            <Text numberOfLines={1} style={styles.nameText}>
              Luis Fonsi
            </Text>
            <Text numberOfLines={1} style={styles.msgText}>
              Las notas de aprendizaje automático ya se han subido, puedes
              consultarlas donde te plazca
            </Text>
          </View>
          <Text style={styles.hourText}>12:58</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chatContainer}
          onPress={() =>
            this.props.navigation.navigate("Chat", {
              title: "Teodorico"
            })
          }
        >
          <Image source={{ uri: samplePic }} style={styles.profilePic} />
          <View style={styles.nameAndMsgContainer}>
            <Text numberOfLines={1} style={styles.nameText}>
              Gesaleico Leovigildo López
            </Text>
            <Text numberOfLines={1} style={styles.msgText}>
              Okay brother
            </Text>
          </View>
          <Text style={styles.hourText}>12:58</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chatContainer}
          onPress={() =>
            this.props.navigation.navigate("Chat", {
              title: "Laura T."
            })
          }
        >
          <Image source={{ uri: samplePic }} style={styles.profilePic} />
          <View style={styles.nameAndMsgContainer}>
            <Text numberOfLines={1} style={styles.nameText}>
              Inés R.
            </Text>
            <Text numberOfLines={1} style={styles.msgText}>
              Guay
            </Text>
          </View>
          <Text style={styles.hourText}>12:58</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chatContainer}
          onPress={() =>
            this.props.navigation.navigate("Chat", {
              title: "Laura T."
            })
          }
        >
          <Image source={{ uri: samplePic }} style={styles.profilePic} />
          <View style={styles.nameAndMsgContainer}>
            <Text numberOfLines={1} style={styles.nameText}>
              Inés R.
            </Text>
            <Text numberOfLines={1} style={styles.msgText}>
              Guay
            </Text>
          </View>
          <Text style={styles.hourText}>12:58</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chatContainer}
          onPress={() =>
            this.props.navigation.navigate("Chat", {
              title: "Laura T."
            })
          }
        >
          <Image source={{ uri: samplePic }} style={styles.profilePic} />
          <View style={styles.nameAndMsgContainer}>
            <Text numberOfLines={1} style={styles.nameText}>
              Inés R.
            </Text>
            <Text numberOfLines={1} style={styles.msgText}>
              Guay
            </Text>
          </View>
          <Text style={styles.hourText}>12:58</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chatContainer}
          onPress={() =>
            this.props.navigation.navigate("Chat", {
              title: "Laura T."
            })
          }
        >
          <Image source={{ uri: samplePic }} style={styles.profilePic} />
          <View style={styles.nameAndMsgContainer}>
            <Text numberOfLines={1} style={styles.nameText}>
              Inés R.
            </Text>
            <Text numberOfLines={1} style={styles.msgText}>
              Guay
            </Text>
          </View>
          <Text style={styles.hourText}>12:58</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chatContainer}
          onPress={() =>
            this.props.navigation.navigate("Chat", {
              title: "Laura T."
            })
          }
        >
          <Image source={{ uri: samplePic }} style={styles.profilePic} />
          <View style={styles.nameAndMsgContainer}>
            <Text numberOfLines={1} style={styles.nameText}>
              Inés R.
            </Text>
            <Text numberOfLines={1} style={styles.msgText}>
              Guay
            </Text>
          </View>
          <Text style={styles.hourText}>12:58</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chatContainer}
          onPress={() =>
            this.props.navigation.navigate("Chat", {
              title: "Laura T."
            })
          }
        >
          <Image source={{ uri: samplePic }} style={styles.profilePic} />
          <View style={styles.nameAndMsgContainer}>
            <Text numberOfLines={1} style={styles.nameText}>
              Inés R.
            </Text>
            <Text numberOfLines={1} style={styles.msgText}>
              Guay
            </Text>
          </View>
          <Text style={styles.hourText}>12:58</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chatContainer}
          onPress={() =>
            this.props.navigation.navigate("Chat", {
              title: "Laura T."
            })
          }
        >
          <Image source={{ uri: samplePic }} style={styles.profilePic} />
          <View style={styles.nameAndMsgContainer}>
            <Text numberOfLines={1} style={styles.nameText}>
              Inés R.
            </Text>
            <Text numberOfLines={1} style={styles.msgText}>
              Guay
            </Text>
          </View>
          <Text style={styles.hourText}>12:58</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
