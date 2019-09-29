// import React, { Component } from "react";
// import Orientation, { orientation } from "react-native-orientation";
import { createAppContainer } from "react-navigation";

import Navigator from "./navigator/Navigator";

const App = createAppContainer(Navigator);

export default App;