import React from "react";
import { ThemeProvider } from "styled-components";
import { createMuiTheme } from "@material-ui/core";
import { Normalize } from "styled-normalize";
import "../styles/global.css"; // apply global style

const App = (props) => {
  const { Component, pageProps } = props;
  const theme = createMuiTheme();

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Normalize /> {/** nomalize css */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
