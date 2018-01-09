import React from "react"
import { Provider } from "react-redux"
import { View, Platform } from "react-native"
import { Constants } from "expo"

import Routes from "./src/Routes"

import store from "./src/store"

const paddingTop = Platform.OS === "ios" ? 0 : Constants.statusBarHeight

/* eslint no-console: 0 */
console.ignoredYellowBox = [
  'Setting a timer',
]

const App = () => (
  <Provider store={store}>
    <View style={{ flex: 1, paddingTop }}>
      <Routes />
    </View>
  </Provider>
)

export default App