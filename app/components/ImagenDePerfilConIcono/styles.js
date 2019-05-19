import { StyleSheet } from "react-native";

import { Azul } from "../../constants";

export default StyleSheet.create({
    viewIcon: {
        position: "absolute",
        bottom: 5,
        right: 5,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Azul,
        justifyContent: "center",
        alignItems: "center"
    },
    touchable: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    }
});
