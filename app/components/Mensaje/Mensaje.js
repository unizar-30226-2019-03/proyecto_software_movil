/**
 * @fileoverview Un mensaje del chat
 * @author Unicast
 *
 */
import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";
/**
 * @param {Object} props props para renderizar el componente
 *    props.fecha fecha del mensaje en formato AAAA-MM--DDT09:HH.MM.MMMZ
 *    props.esMio indica si el mensaje fue escrito por el usuario o no
 *    props.mensaje cuerpo del mensaje
 * @module Mensaje
 *
 */
export default class Mensaje extends React.Component {
  /**
   * Parsea una cadena del tipo "2019-05-25T09:10:27.904Z"
   * y obtiene la fecha y hora del mensaje (España)
   */
  parsearFecha() {
    aux = this.props.fecha.split("Z");
    aux = aux[0];
    aux = aux.split("T");
    fecha = aux[0];
    hora = aux[1];
    hora = hora.split(":");
    minutos = hora[1];
    hora = parseInt(hora[0]) + 2;
    fecha = fecha.split("-");
    anyo = fecha[0];
    mes = fecha[1];
    dia = fecha[2];
    if (hora >= 24) {
      hora = hora % 24;
      dia = parseInt(dia) + 1;
      if (dia > this.diasDelMes(mes, anyo)) {
        mes = parseInt(mes) + 1;
        dia = 1;
        if (mes > 12) {
          anyo = parseInt(anyo) + 1;
          mes = 1;
        }
      }
    }
    horaTotal = String(hora) + ":" + minutos;
    diaActual = String(new Date().getDate()).padStart(2, "0");

    mesActual = new Date().getMonth() + 1;
    anyoActual = new Date().getFullYear();

    preludio = "";
    if (mesActual == mes && anyoActual == anyo) {
      if (
        this.esAyer(
          parseInt(dia),
          parseInt(mes),
          parseInt(anyo),
          parseInt(diaActual),
          parseInt(mesActual),
          parseInt(anyoActual)
        )
      ) {
        preludio = "ayer";
      } else if (dia != diaActual) {
        preludio = dia + "/" + mes + "/" + anyo;
      }
    }
    return preludio + " " + horaTotal;
  }
  /**
   *
   * @param {Number} anyo Un año
   * @return {Boolean} Devuelve si el año es bisiesto
   */
  esBisiesto(anyo) {
    return (anyo % 4 == 0 && anyo % 100 != 0) || anyo % 400 == 0;
  }
  /**
   *
   * @param {Number} mes Un mes (del 1 al 12)
   * @param {Number} anyo Un año
   * @return {Number} Devuelve los dias del mes en el año
   */
  diasDelMes(mes, anyo) {
    if (mes == 2) {
      if (this.esBisiesto(anyo)) {
        return 29;
      } else {
        return 28;
      }
    } else {
      if (mes == 8) {
        return 31;
      } else {
        if (mes % 2 == 1) {
          return 31;
        } else {
          return 30;
        }
      }
    }
  }

  /**
   *
   * @param {Number} dia Dia a comprobar
   * @param {Number} mes Mes a comprobar
   * @param {Number} anyo Año a comprobar
   * @param {Number} diaActual Dia actual
   * @param {Number} mesActual Mes actual
   * @param {Number} anyoActual Año actual
   * @return {Boolean} Devuelve true si dia/mes/anyo corresponde al dia anterior a
   *    diaActual/mesActual/anyoActual
   */
  esAyer(dia, mes, anyo, diaActual, mesActual, anyoActual) {
    if (mes == mesActual && anyo == anyoActual && dia + 1 == diaActual) {
      return true;
    } else {
      if (mes + 1 == mesActual && anyo == anyoActual) {
        return dia == this.diasDelMes(mes, anyo) && diaActual == 1;
      } else {
        if (anyo + 1 == anyoActual && mes == 12 && mesActual == 1) {
          return dia == 31 && diaActual == 1;
        } else {
          return false;
        }
      }
    }
  }
  render() {
    return (
      <View
        style={[this.props.esMio == false ? styles.entrante : styles.saliente]}
      >
        <Text style={styles.texto}>{this.props.mensaje}</Text>
        <Text style={styles.textoSmall}>
          {this.parsearFecha(this.props.fecha)}
        </Text>
      </View>
    );
  }
}
