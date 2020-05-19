import React from "react"
// import { Helmet } from "react-helmet"
import { hot } from "react-hot-loader"

import { Container } from "semantic-ui-react"
import "@cs125/semantic-ui/semantic.min.css"

import { MDXProvider } from "@mdx-js/react"
import Content from "./index.mdx"

import { GoogleLoginProvider } from "@cs125/react-google-login"

import { Highlighted } from "@cs125/semantic-ui"
import { headings } from "@cs125/semantic-ui"
const components = {
  code: Highlighted,
  ...headings
}

const App: React.SFC = () => (
  <React.Fragment>
    <GoogleLoginProvider
      clientConfig={{
        client_id: "948918026196-q49uid1opmf7oid570ptpl7kd1alcjru.apps.googleusercontent.com",
      }}
    >
      <Container text style={{ paddingTop: 16 }}>
        <MDXProvider components={components}>
          <Content />
        </MDXProvider>
      </Container>
    </GoogleLoginProvider>
  </React.Fragment>
)
export default hot(module)(App)
