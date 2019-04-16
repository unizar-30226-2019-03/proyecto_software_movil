import React from "react";

import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
	SlideInMenu
} from "react-native-popup-menu";

import styles from "./styles";

const AnyadirALista = ({ menuTrigger }) => {
	return (
		<Menu name="AnyadirALista" renderer={SlideInMenu}>
			<MenuTrigger>{menuTrigger}</MenuTrigger>
		  <MenuOptions customStyles={{ optionText: [styles.text, styles.slideInOption] }}>
		    <MenuOption text='Option one'  />
		    <MenuOption text='Option two' />
		    <MenuOption text='Option three' />
		    <MenuOption text='Option four' />
		    <MenuOption text='Option five' />
		  </MenuOptions>
		</Menu>
	);
};

export default AnyadirALista;
