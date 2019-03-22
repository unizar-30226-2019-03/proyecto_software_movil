# proyecto_software_movil

## Installation

OS X & Linux:

1. Nodejs
```
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install nodejs
```

2. Expo CLI
```
npm install -g expo-cli
```

3. Android Studio y emulador android
	- [Instalar Android Studio junto con Android SDK](https://developer.android.com/studio/index.html?gclid=Cj0KEQiAm-CyBRDx65nBhcmVtbIBEiQA7zm8lWCaBd9n9KYYunFXxXsQCPojBVHk5eIH4p9CWM1eLfUaAmd28P8HAQ "Instalador")
	- Crear un proyecto dummy que servirá para iniciar el emulador Android.
	- Crear un dispositivo virtual:
		- Tools - AVD Manager
		- Create Virtual Device...
		- Phone - Nexus 4 - Última versión Android (Download si es necesario)
	- El emulador se puede iniciar en cualquier momento pulsando el botón **Run app (Shift+F10)** del proyecto dummy de Android Studio.

Windows:

## Starting developing

1. `cd proyecto_software_movil`
2. Iniciar el emulador Android a través de un proyecto de Android Studio pulsando sobre el botón **Run app (Shift+F10)**
3. `npm start` 
	- Si hay error ***ENOSPC*** o ***events.js:X throw***:
	`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
3. En la pestaña del buscador que se abre seleccionar la opción: local.

## Clone
Clone this repo to your local machine using `git@github.com:unizar-30226-2019-03/proyecto_software_movil.git`

## Where to place files

https://medium.com/the-react-native-log/organizing-a-react-native-project-9514dfadaa0
