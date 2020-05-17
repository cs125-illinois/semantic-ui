import React from "react"
// import { Helmet } from "react-helmet"
import { hot } from "react-hot-loader"

import { Container } from "semantic-ui-react"
import "@cs125/semantic-ui/semantic.min.css"

import { MDXProvider } from "@mdx-js/react"
import Content from "./index.mdx"

import { GoogleLoginProvider } from "@cs125/react-google-login"

const App: React.SFC = () => (
  <React.Fragment>
    <GoogleLoginProvider
      clientConfig={{
        client_id: "948918026196-q49uid1opmf7oid570ptpl7kd1alcjru.apps.googleusercontent.com",
      }}
    >
      <Container text style={{ paddingTop: 16 }}>
        <MDXProvider>
          <Content />
        </MDXProvider>
      </Container>
    </GoogleLoginProvider>
  </React.Fragment>
)
export default hot(module)(App)
