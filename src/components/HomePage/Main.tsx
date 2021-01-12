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

type Props = {
  maps: TMaps[];
  pathPrefix: string
};

const Main: React.FC<Props> = ({ maps, pathPrefix }) => {
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
                <Grid xs={"auto"} item key={map._id}>
                  <RoadButton
                    href={`${pathPrefix}/${map._id}`}
                    name={map.name}
                    id={map._id}
                    intro={map.introduction}
                  />
                </Grid>
              ))}
              <Grid xs={"auto"} item>
                <RoadButton
                  disabled
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
