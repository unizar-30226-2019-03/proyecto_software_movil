/**
 * @fileoverview Gestor de notificaciones de la aplicacion
 * @author Unicast
 * @requires ../../constants:PeriodoNotificaciones
 * @requires ../../components/Time:timeStampToFormat
 * @requires swagger_unicast:UserApi
 * @requires swagger_unicast:ApiClient
 * @requires swagger_unicast:NotificationApi
 */
import React from "react";

import { Notifications } from "expo";

import Auth from "../../config/Auth";

import { PeriodoNotificaciones } from "../../constants";

import { timeStampToFormat } from "../../components/Time";

import { UserApi, ApiClient, NotificationApi } from "swagger_unicast";

/**
 * Gestion de notificaciones de la aplicacion
 * @module UnicastNotifications
 */
export default class UnicastNotifications extends React.Component {
  static userToken = undefined;
  static userId = undefined;
  static professor = undefined;

  static timer = null;
  static apiInstance = new NotificationApi();
  static userApiInstance = new UserApi();

  static uncheckedNotifications = null;
  static page0Managed = true;

  static currentDate = undefined;

  //static msgTimePending = true;
  //static vidTimePending = true;
  static curRemitenteId = null;
  static lastRemitenteId = null;
  static lastMsgDate = null;
  static lastVidDate = null;

  static newMessageCallback = null;

  static callbackCalled = false;

  static newNotifications = false;

  static notificationRenderAndroid = {
    //icon: "../../assets/icon.png", //TO_DO, ICONO DE JASEN
    color: "#0000"
  };
  /**
   * Inicia los canales para mensajes y videos
   */
  static setUpChannels() {
    msgChannel = {
      name: "Mensajes en UniCast",
      description: "Notificaciones de UniCast de mensajes nuevos recibidos",
      vibrate: true,
      badge: true
    };
    vidChannel = {
      name: "Nuevos vídeos en UniCast",
      description:
        "Notificaciones de UniCast de vídeos nuevos de asignaturas a las que sigues",
      vibrate: [0, 250, 250],
      badge: true
    };
    Notifications.createChannelAndroidAsync("msg", msgChannel);
    Notifications.createChannelAndroidAsync("vid", vidChannel);
  }

  /**
   * Inicia el singleTon para obtener nuevas notificaciones
   */
  static fireSingleton() {
    console.log("intento empezar timer");
    if (this.timer == null) {
      console.log("empiezo timer piola");
      this.setUpChannels();
      this.timer = setInterval(() => {
        console.log("tick");
        if (!this.fetchingNotifications) {
          this.fetchingNotifications = true;
          this.fetchNewNotifications();
        }
      }, PeriodoNotificaciones);
    } else {
      console.log("no lo logre wacho");
    }
  }
  /**
   * Elimina el singleton para obtener nuevas notificaciones
   */
  static killSingleton() {
    clearInterval(this.timer);
    this.timer = null;
  }
  /**
   * Obtiene nuevas notificaciones
   */
  static fetchNewNotifications() {
    let opts = {
      page: 0
    };
    this.apiInstance.getUserUncheckedNotifications(
      opts,
      (error, data, response) => {
        if (!error) {
          this.currentDate = ApiClient.parseDate(response.headers.date);
          this.uncheckedNotifications = data._embedded.usersAreNotified;
          this.renderNotifications();
        }
      }
    );
    this.fetchingNotifications = false;
  }

  static managePage0() {
    // PARA CADA NOTI, CHEQUEAR
    // console.log("las notif ", this.uncheckedNotifications);
    // for (let count = 0; count < this.uncheckedNotifications.length; ++count) {
    //   let thisNoti = this.uncheckedNotifications[count].notification;
    //   if (/*this.msgTimePending &&*/ thisNoti.notificationCategory == "messages") {
    //     //this.msgTimePending = false;
    //     if (thisNoti.timestamp > this.lastMsgDate) {
    //       this.lastMsgDate = thisNoti.timestamp;
    //       this.mustRenderMsg = true;
    //       this.lastRemitenteId = this.curRemitenteId;
    //       this.curRemitenteId = thisNoti.creatorId;
    //     }
    //   } else if (
    //     //this.vidTimePending &&
    //     thisNoti.notificationCategory != "messages"
    //   ) {
    //     //this.vidTimePending = false;
    //     if (thisNoti.timestamp > this.lastVidDate) {
    //       this.lastVidDate = thisNoti.timestamp;
    //       this.mustRenderVid = true;
    //     }
    //   }
    // }
  }
  /**
   * Inicia el callback al recibir notificacion de nuevo mensaje
   * @param {Function} callback callback al recibir un nuevo mensaje
   */
  static setNewMessageCallback(callback) {
    newMessageCallback = callback;
  }

  /**
   * Elimina el callback al recibir un nuevo mensaje
   */
  static cleanNewMessageCallback() {
    newMessageCallback = null;
  }

  /**
   * Muestra las notificaciones en pantalla
   */
  static renderNotifications() {
    this.callbackCalled = false;
    console.log("empiezo render notifications");

    for (let count = 0; count < this.uncheckedNotifications.length; ++count) {
      let thisNoti = this.uncheckedNotifications[count].notification;
      if (thisNoti.notificationCategory == "messages") {
        let opts = {
          cacheControl: "no-cache, no-store, must-revalidate",
          pragma: "no-cache",
          expires: 0
        };
        this.userApiInstance.getUser(
          thisNoti.creatorId,
          opts,
          (error, data, response) => {
            if (!error) {
              Notifications.presentLocalNotificationAsync({
                title: "Unicast",
                body:
                  "Nuevo mensaje de " +
                  data.name +
                  ": " +
                  timeStampToFormat(thisNoti.timestamp, this.currentDate)
              });

              if (!this.callbackCalled && this.newMessageCallback) {
                this.callbackCalled = true;
                this.newMessageCallback();
              }
            } else {
              console.log("ERROR OBTENIENDO EL USER!");
            }
          }
        );
      } else {
        Notifications.presentLocalNotificationAsync({
          title: "Unicast",
          body:
            "Nuevo vídeo subido: " +
            timeStampToFormat(thisNoti.timestamp, this.currentDate)
        });
      }

      this.apiInstance.checkNotification(thisNoti.id, () => {
        console.log("chequeo ", count);
      });
    }
  }
}
