import {
  Box,
  Container,
  createStyles,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import RoadButton from "./RoadButton";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      minHeight: "400px",
      padding: '30px 0',
      display: "flex",
      backgroundColor: "#f2f2f2",
    },
    gridContainer: {
      margin: "auto",
    },
  })
);

const Main = ({maps}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Box display="flex" height="100%">
          <Box margin="auto">
          <Grid container spacing={3} justify="center">
            <Grid xs={4} item>
              <RoadButton
                href="/gg"
                name="PHP"
                detail="Lộ trình để trở thành một lập trình viên PHP"
              />
            </Grid>
            <Grid xs={4} item>
              <RoadButton
                href="/gg"
                name="PHP"
                detail="Lộ trình để trở thành một lập trình viên PHP"
              />
            </Grid>
            <Grid xs={4} item>
              <RoadButton
                href="/gg"
                name="PHP"
                detail="Lộ trình để trở thành một lập trình viên PHP"
              />
            </Grid>
          </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Main;
