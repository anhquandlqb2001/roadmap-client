import { makeStyles, Theme } from "@material-ui/core";
import fs from "fs";
import { GetStaticProps, NextPage } from "next";
import path from "path";
import React, { useEffect } from "react";
import Layout from "../../components/Common/Layout";
import Map from "../../components/Map/Map";
import { Box } from "@material-ui/core";
interface Props {
  name: string;
  id: string;
}

const Road: NextPage<Props> = ({ name }) => {
  const [map, setMap] = React.useState({});
  const classes = useStyles();

  useEffect(() => {
    if (!localStorage.getItem(name)) {
      import(`../../lib/maps/${name}.json`).then((data) => {
        setMap(data.default);
        localStorage.setItem(name, JSON.stringify(data.default));
      });
      return;
    }
    setMap(JSON.parse(localStorage.getItem(name)));
  }, []);

  return (
    <Layout title={name} content={`Lộ trình học tập ${name}`}>
      <div className={classes.root}>
        <Box
          maxWidth={"1400px"}
          mx={"auto"}
          border={"1px solid black"}
          borderRadius={"20px"}
        >
          <Map name={name} map={map} />
        </Box>
      </div>
    </Layout>
  );
};

export const getStaticPaths = () => {
  let filenames: string[] = [];
  try {
    const postsDirectory = path.join(process.cwd(), "src/lib/maps");
    filenames = fs.readdirSync(postsDirectory);
  } catch (error) {
    console.log(error);
  }
  const paths = filenames.map((filename) => ({
    params: { id: filename.split(".")[0] },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  return {
    props: {
      name: id,
      id: id,
    },
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default Road;
