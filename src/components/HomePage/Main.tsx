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
  maps: {
    _id: string,
    name: string
  }[];
};

const Main: React.FC<Props> = ({ maps }) => {
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
                    href={`/road/${map.name}`}
                    name={map.name}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Main;
