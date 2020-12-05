import NextApp from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import {createMuiTheme} from '@material-ui/core'
import UserProvider from "../src/lib/util/userContext";
import { Normalize } from 'styled-normalize'
import '../src/styles/global.css' // apply global style

export default class App extends NextApp {
  theme = createMuiTheme()

  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={this.theme}>
        <Normalize /> {/** nomalize css */}
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    );
  }
}
