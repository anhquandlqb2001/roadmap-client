import React from "react";
import { ThemeProvider } from "styled-components";
import { createMuiTheme } from "@material-ui/core";
import UserProvider from "../lib/util/userContext";
import { Normalize } from "styled-normalize";
import "../styles/global.css"; // apply global style
import { askUserPermission, createNotificationSubscription } from "../lib/util/pushNotification";
import { postUserSubscription } from "../lib/api/user";

const App = (props) => {
  const { Component, pageProps } = props;
  const theme = createMuiTheme();
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  React.useEffect(() => {
    const askPermission = async () => {
      const response = await askUserPermission()
      if (response === "granted") {
        const subscription = await createNotificationSubscription()
        await postUserSubscription(subscription)
      }
    }
    askPermission()
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Normalize /> {/** nomalize css */}
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
