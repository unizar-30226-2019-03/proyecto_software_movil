import React from "react";
import { Text, View ,TouchableHighlight} from "react-native";

import styles from "./styles";
import IconoAsignaturaUniversidad from "../IconoAsignaturaUniversidad"
export default class ThumbnailAsignatura extends React.Component{
    render(){
        return(
            <View>
                <TouchableHighlight
					onPress={() =>
                        this.props.navigation.navigate("Asignatura", {
                            title: this.props.asignatura
                        })
                    }
					title="IR A VIDEO"
				>
                    <View style={styles.container}>
                    
                        <View style={styles.asignaturaIcon}>
                            <IconoAsignaturaUniversidad 
                            image={require("../../../test/imagenes/perfil_uni.jpg")}
                            name={this.props.asignatura}
                            />
                            

                        </View> 
                        <Text style={styles.texto}>{this.props.asignatura}</Text>
                        
                
                    </View>
                </TouchableHighlight>
            </View>
        );
            
        
    }
}