import NextApp from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import UserProvider from "../src/lib/util/userContext";
import { Normalize } from 'styled-normalize'
import '../styles/global.css' // apply global style

const theme = {
  primary: "green",
};
export default class App extends NextApp {
  // remove it here
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Normalize /> {/** nomalize css */}
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    );
  }
}
