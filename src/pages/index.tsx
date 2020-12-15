import React from "react";
import { getMapList, TMaps } from "../lib/api/road";
import NavBar from "../components/home.page/NavBar";
import Intro from "../components/home.page/Intro";
import Main from "../components/home.page/Main";
import { UserContext } from "../lib/util/userContext";
import { NextPage } from "next";

interface Props {
  maps: TMaps[]
}

const Home: NextPage<Props> = ({ maps }) => {
  const profile = React.useContext(UserContext)
  return (
    <>
      <NavBar profile={profile} />
      <Intro />
      <Main maps={maps} />
    </>
  );
};

export const getStaticProps = async () => {
  const response = await getMapList();
  if (response.data && !response.data.success) {
    return alert("Loi");
  }
  return { props: { maps: response.data.maps } };
};

export default Home;
