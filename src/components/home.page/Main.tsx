import {
  Box,
  Container,
  createStyles,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import RoadButton from "./RoadButton";
import { TMaps } from "../../lib/api/road";
import { NextPage } from "next";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      minHeight: "400px",
      padding: "30px 0",
      display: "flex",
      backgroundColor: "#f2f2f2",
    },
    gridContainer: {
      margin: "auto",
    },
  })
);

type MainType = {
  maps: TMaps[];
};

const Main: NextPage<MainType> = ({ maps }) => {
  const classes = useStyles();
  if (!maps) {
    return null;
  }
  return (
    <div className={classes.root}>
      <Container>
        <Box display="flex" height="100%">
          <Box margin="auto">
            <Grid container spacing={3} justify="center">
              {maps.map((map) => (
                <Grid xs={4} item key={map._id}>
                  <RoadButton
                    href={`/road/${map._id}`}
                    name={map.name}
                    id={map._id}
                    intro={map.introduction}
                  />
                </Grid>
              ))}
              <Grid xs={4} item>
                <RoadButton
                  disabled
                  id="123"
                  href="/gg"
                  name="PHP"
                  intro="Lộ trình để trở thành một lập trình viên PHP"
                />
              </Grid>
              <Grid xs={4} item>
                <RoadButton
                  id="123"
                  href="/gg"
                  name="PHP"
                  intro="Lộ trình để trở thành một lập trình viên PHP"
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
