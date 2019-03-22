#!/bin/bash

# Script a ejecutar al clonar el repositorio de github.
# Ademas de instalar dependencias para poder ejecutar el proyecto, hace que git 
# no trackee localmente package.json y package-lock.json.

git update-index --skip-worktree package.json
git update-index --skip-worktree package-lock.json
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
npm install

# Para volver a trackear cambios
# git update-index --no-skip-worktree package.json
# git update-index --no-skip-worktree package-lock.json
