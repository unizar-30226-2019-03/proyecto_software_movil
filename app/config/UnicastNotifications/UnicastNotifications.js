import React from "react";

import { Notifications } from "expo";

import { observable, action } from "mobx";

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
  static totalPages = undefined;

  static uncheckedNotifications = null;
  static page0Managed = true;

  static currentDate = undefined;

  static msgTimePending = true;
  static vidTimePending = true;
  static lastMsgDate = null;
  static lastVidDate = null;

  @observable newNotifications = false;

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
      description:
        "Notificaciones de UniCast de vídeos nuevos de asignaturas a las que sigues",
      vibrate: [0, 250, 250],
      badge: true
    };
    Notifications.createChannelAndroidAsync("msg", msgChannel);
    Notifications.createChannelAndroidAsync("vid", vidChannel);
  }

  static getObservedNewNotifications() {
    return this.newNotifications;
  }

  static setObservedNewNotifications(value) {
    this.newNotifications = value;
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
      page: 0 //creo que es 0 porque cada vez que mires la pagina 0 se checkearán todas esas notis, con lo cual no haría falta llevar conteo de offset
    };
    do {
      this.apiInstance.getUserUncheckedNotifications(
        opts,
        (error, data, response) => {
          if (!error) {
            this.totalPages = data.page.totalPages;
            this.currentDate = ApiClient.parseDate(response.headers.date);
            this.uncheckedNotifications = data._embedded.usersAreNotified;
            console.log(
              "notificaciones sin chequear : ",
              this.uncheckedNotifications
            );
            console.log("num pags : ", this.totalPages);
            this.managePage0();
            if (this.totalPages == 1) {
              this.renderNotifications();
            }
            console.log("he acabado la pagina");
            // this.totalPages = data.page.totalPages;
            // this.offset = this.totalPages > (this.offset + 1) ? ...
          }
        }
      );
    } while (this.totalPages > 1);

    this.fetchingNotifications = false;
  }

  static managePage0() {
    // PARA CADA NOTI, CHEQUEAR
    console.log("length: ", this.uncheckedNotifications.length);
    for (let count = 0; count < this.uncheckedNotifications.length; count++) {
      let thisNoti = this.uncheckedNotifications[count].notification;

      if (this.msgTimePending && thisNoti.notificationCategory == "messages") {
        this.msgTimePending = false;
        this.lastMsgDate = thisNoti.timestamp;
        this.setObservedNewNotifications(true);
      } else if (
        this.vidTimePending &&
        thisNoti.notificationCategory != "messages"
      ) {
        this.vidTimePending = false;
        this.lastVidDate = thisNoti.timestamp;
      }

      this.apiInstance.checkNotification(
        thisNoti.id,
        () => {
          console.log("chequeo ", count);
        }
        /* {
          if (error) {
            console.log("ERROR EN EL CHEQUEO");
            if (error.status == 403) {
              Auth.signOut(this.props.navigation);
            }
          } else {
            console.log("BIEN EL CHEQUEO");
          }
        } */
      );

      console.log(
        "todas las ",
        this.uncheckedNotifications.length,
        " chequeadas"
      );
    }
  }

  static renderNotifications() {
    console.log("empiezo render not");
    if (!this.msgTimePending) {
      console.log("CREO NOT DE MENS");
      Notifications.presentLocalNotificationAsync(
        {
          title: "Unicast",
          body:
            "Nuevo mensaje recibido: " +
            timeStampToFormat(this.lastMsgDate, this.currentDate)
        },
        "msg"
      );
    }

    if (!this.vidTimePending) {
      Notifications.presentLocalNotificationAsync(
        {
          title: "Unicast",
          body:
            "Nuevo vídeo subido: " +
            timeStampToFormat(this.lastVidDate, this.currentDate)
        },
        "vid"
      );
    }

    this.msgTimePending = true;
    this.vidTimePending = true;
    this.lastMsgDate = null;
    this.lastVidDate = null;
  }
}
