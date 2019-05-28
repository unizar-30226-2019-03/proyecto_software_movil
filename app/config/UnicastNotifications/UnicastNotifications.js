import React from "react";

import { Notifications } from "expo";

import Auth from "../../config/Auth";

import { PeriodoNotificaciones } from "../../constants";

import { timeStampToFormat } from "../../components/Time";

import { UserApi, ApiClient, NotificationApi } from "swagger_unicast";

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
  static remitenteName = undefined;
  static curRemitenteId = null;
  static lastRemitenteId = null;
  static lastMsgDate = null;
  static lastVidDate = null;

  static newMessageCallback = null;

  static newNotifications = false;

  static notificationRenderAndroid = {
    //icon: "../../assets/icon.png", //TO_DO, ICONO DE JASEN
    color: "#0000"
  };

  static setUpChannels() {
    msgChannel = {
      name: "Mensajes en UniCast",
      description: "Notificaciones de UniCast de mensajes nuevos recibidos",
      vibrate: true,
      badge: true
    };
    vidChannel = {
      name: "Nuevos vídeos en UniCast",
      description: "Notificaciones de UniCast de vídeos nuevos de asignaturas a las que sigues",
      vibrate: [0, 250, 250],
      badge: true
    };
    Notifications.createChannelAndroidAsync("msg", msgChannel);
    Notifications.createChannelAndroidAsync("vid", vidChannel);
  }

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

  static killSingleton() {
    clearInterval(this.timer);
    this.timer = null;
  }

  static fetchNewNotifications() {
    let opts = {
      page: 0
    };
    this.apiInstance.getUserUncheckedNotifications(opts, (error, data, response) => {
      if (!error) {
        this.currentDate = ApiClient.parseDate(response.headers.date);
        this.uncheckedNotifications = data._embedded.usersAreNotified;
        console.log("notificaciones sin chequear : ", this.uncheckedNotifications);
        this.managePage0();
        this.renderNotifications();
        console.log("he acabado la pagina");
        // this.totalPages = data.page.totalPages;
        // this.offset = this.totalPages > (this.offset + 1) ? ...
      }
    });
    this.fetchingNotifications = false;
  }

  static managePage0() {
    // PARA CADA NOTI, CHEQUEAR
    console.log("length: ", this.uncheckedNotifications.length);

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

  static setNewMessageCallback(callback) {
    newMessageCallback = callback;
  }

  static cleanNewMessageCallback() {
    newMessageCallback = null;
  }

  static renderNotifications() {
    let remitenteName = null;
    let callbackCalled = false;
    console.log("empiezo render notifications");


    for (let count = 0; count < this.uncheckedNotifications.length; ++count) {
      if (this.uncheckedNotifications[i].notificationCategory == "message") {
        this.userApiInstance.getUser(this.uncheckedNotifications[count].id, opts, (error, data, response) => {
          if (!error) {
            remitenteName = data.name;
          }
        });

        Notifications.presentLocalNotificationAsync({
          title: "Unicast",
          body: "Nuevo mensaje de " + remitenteName + ": " + timeStampToFormat(this.uncheckedNotifications[count].timestamp, this.currentDate)
        });

        if (!callbackCalled && newMessageCallback) {
          callbackCalled = true;
          newMessageCallback();
        }
      }
      else {
        Notifications.presentLocalNotificationAsync({
          title: "Unicast",
          body: "Nuevo vídeo subido: " + timeStampToFormat(this.uncheckedNotifications[count].timestamp, this.currentDate)
        });
      }

      this.apiInstance.checkNotification(this.uncheckedNotifications[count].id, () => {
        console.log("chequeo ", count);
      });
    }
  }
}
