#!/bin/bash

# Si los fin de linea se cambian por los de windows: sed -i 's/\r$//' utilities.sh

help() {
	echo -e "Usage: ./utilities.sh \e[3margument\e[0m"
	echo -e "Utilidades del proyecto."
	echo ""

	echo "Arguments:"
	echo -e "  -h, --help \t\t\t Display this help and exit"
	echo -e "  -s, --sdeveloping \t\t Install dependencies to start developing after clone"
	echo -e "  -i, --install \t\t Install Nodejs + Expo"
	echo -e "  -t, --track \t\t\t Git starts tracking package.json and package-lock.json files"
	echo -e "  -u, --untrack \t\t Git starts untracking package.json and package-lock.json files"

	echo ""
	echo "Exit status:"
	echo -e "  0  if OK"
	echo -e "  1  if minor problems (e.g., incorrect number of parameters)"
}

if [ $# -ne "1" ]; then
	echo "Incorrect number of parameters"
	echo ""
	help
	exit 1
fi

case "$1" in
	-h|--help)
		help
		exit 0
		;;
	-s|--sdeveloping)
		git update-index --skip-worktree package.json
		git update-index --skip-worktree package-lock.json
		echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
		npm install
		exit 0
		;;
	-i|--install)
		apt install curl
		curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
		apt install nodejs
		npm install -g expo-cli --unsafe-perm=true --allow-root
		exit 0
		;;
	-t|--track)
		git update-index --no-skip-worktree package.json
		git update-index --no-skip-worktree package-lock.json
		exit 0
		;;
	-u|--untrack)
		git update-index --skip-worktree package.json
		git update-index --skip-worktree package-lock.json
		exit 0
		;;
	*)
		echo "Incorrect argument"
		echo ""
		help
		exit 1
		;;
esac
