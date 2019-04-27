# proyecto_software_movil

## Installation

1. Clonar el proyecto.
2. `cd proyecto_software_movil`
3. Ejectutar `./utilities.sh -i` para instalar NodeJs y Expo.
4. Android Studio y emulador android
   - [Instalar Android Studio junto con Android SDK](https://developer.android.com/studio/index.html?gclid=Cj0KEQiAm-CyBRDx65nBhcmVtbIBEiQA7zm8lWCaBd9n9KYYunFXxXsQCPojBVHk5eIH4p9CWM1eLfUaAmd28P8HAQ "Instalador")
   - Crear un proyecto dummy que servirá para iniciar el emulador Android.
   - Crear un dispositivo virtual: - Tools - AVD Manager - Create Virtual Device... - Phone - Nexus 4 - Última versión Android (Download si es necesario)
   - El emulador se puede iniciar en cualquier momento pulsando el botón **Run app (Shift+F10)** del proyecto dummy de Android Studio.

## Start developing

1. `cd proyecto_software_movil`
2. Ejecutar `./utilities.sh -s`
3. Iniciar el emulador Android a través de un proyecto de Android Studio pulsando sobre el botón **Run app (Shift+F10)**
4. En la pestaña del buscador que se abre seleccionar la opción: local.

## Instalar librerías

1. `cd proyecto_software_movil`
2. Ejecutar `./utilities.sh -t` para permitir que git trackee package.json (Solo hacer esto cuando la instalacíon va a ser permanente, nunca para probar)
3. Checkear en `https://native.directory/` que la librería es compatible con expo y android.
4. Instalar la librería `npm install {librería}`

Una vez se ha pusheado el cambio de package.json, ejecutar `./utilities.sh -u` para dejar de trackearlo.

## Documentación y pruebas de la api

1. Ir a `https://swagger.io/tools/swagger-ui/` y pulsar sobre **Live Demo**.
2. Cambiar la url de https a http.
3. Poner `https://raw.githubusercontent.com/unizar-30226-2019-03/proyecto_software_backend/master/api-spec.yml` en la barra de explorar.
4. Ahora se puede ver la documentacion de la api (ejemplos de respuesta de métodos, parámetros de funciones etc) y ejecutar métodos en la api directamente en el buscador (añadir nuevos usuarios, asignaturas etc.)

## Clone

Clone this repo to your local machine using `git@github.com:unizar-30226-2019-03/proyecto_software_movil.git`
