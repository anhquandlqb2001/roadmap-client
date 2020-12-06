import {
  Box,
  Container,
  createStyles,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { IRoad } from "../../lib/util/types";
import RoadButton from "./RoadButton";

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
  maps: IRoad[];
};

const Main = ({ maps }: MainType) => {
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
                    href={`/road/${map.name.toLowerCase()}/${map._id}`}
                    name={map.name}
                    intro={map.intro}
                  />
                </Grid>
              ))}
              <Grid xs={4} item>
                <RoadButton href="/gg" name="PHP" intro="Lộ trình để trở thành một lập trình viên PHP" />
              </Grid>
              <Grid xs={4} item>
                <RoadButton href="/gg" name="PHP" intro="Lộ trình để trở thành một lập trình viên PHP" />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Main;
