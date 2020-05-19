import "react-hot-loader"
import "react-app-polyfill/ie11"
import "babel-polyfill"

import React from "react"
import ReactDOM from "react-dom"

import App from "./App"
ReactDOM.render(<App />, document.getElementById("root"))

if (module.hot) {
  module.hot.accept()
}