import React from "react";
import AppNav from "./app/config/Routes";

import { MenuProvider } from 'react-native-popup-menu';

const App = () => (
	<MenuProvider>
		<AppNav/>
	</MenuProvider>
);

export default App;
