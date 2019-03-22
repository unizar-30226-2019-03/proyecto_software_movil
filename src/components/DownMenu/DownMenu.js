import React from 'react';

import {
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Text
} from 'react-native';

import styles from './styles';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SLIcons from 'react-native-vector-icons/SimpleLineIcons';

// TODO: TODO EL ICONO PULSABLE
// TODO: ALINEAR AL CENTRO
// TODO: BAJAR MAS HACIA ABAJO

const DownMenu = props => {
	return (
    <View style={styles.container}>
      <View style={styles.DownMenu}>

        <TouchableOpacity style={styles.DownMenuItems}>
          <MCIcons name='home' size={25} color='#444'/>
          <Text style={styles.DownMenuTitle}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.DownMenuItems}>
          <MCIcons name='trophy' size={25} color='#444'/>
          <Text style={styles.DownMenuTitle}>Ranking</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.DownMenuItems}>
          <EntypoIcon name='graduation-cap' size={25} color='#444'/>
          <Text style={styles.DownMenuTitle}>Asignaturas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.DownMenuItems}>
          <SLIcons name='envelope-letter' size={25} color='#444'/>
          <Text style={styles.DownMenuTitle}>Mensajes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.DownMenuItems}>
          <MCIcons name='folder' size={25} color='#444'/>
          <Text style={styles.DownMenuTitle}>Biblioteca</Text>
        </TouchableOpacity>

      </View>
    </View>
	)
};

export default DownMenu;
