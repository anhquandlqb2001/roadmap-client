import React from "react";
import { getMapList } from "../lib/api/road";
import NavBar from "../components/home.page/NavBar";
import Intro from "../components/home.page/Intro";
import Main from "../components/home.page/Main";

const Home = ({ maps }) => {
  return (
    <>
      <NavBar />
      <Intro />
      <Main maps={maps} />
    </>
  );
};

export const getStaticProps = async () => {
  const response = await getMapList();
  if (response.data && !response.data.success) {
    return alert("Something won't wrong!");
  }
  return { props: { maps: response.data.maps } };
};

export default Home;
