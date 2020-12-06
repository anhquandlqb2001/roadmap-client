import React from "react";
import { getMapList } from "../src/lib/api/road";
import NavBar from "../src/components/home.page/NavBar";
import Intro from "../src/components/home.page/Intro";
import Main from "../src/components/home.page/Main";

const Home = ({ roads }) => {
  return (
    <>
      <NavBar />
      <Intro />
      <Main maps={roads} />
    </>
  );
};

export const getStaticProps = async () => {
  const response = await getMapList();
  if (response.data && !response.data.success) {
    return alert("Something won't wrong!");
  }
  return { props: { roads: response.data.roads } };
};

export default Home;
