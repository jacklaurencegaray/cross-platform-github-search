import React, { Component } from "react"
import { Platform, StyleSheet, Text, View } from "react-native"
import { Provider } from "react-redux"
import store from "shared/Store"
import Search from "./src/screens/Search"

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Search />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
})
