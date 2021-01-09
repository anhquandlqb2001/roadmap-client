import React from "react";
import { getMapInfo, getMapList, TMaps } from "../lib/api/road";
import Intro from "../components/home.page/Intro";
import Main from "../components/home.page/Main";
import { UserContext } from "../lib/util/userContext";
import { NextPage } from "next";
import Layout from "../components/common/Layout";
import { getHomePageContent } from "../lib/api/common";

interface Props {
  maps: TMaps[];
  homePageContent: {
    heading: string
    detail: string
  }
}

const Home: NextPage<Props> = ({ maps, homePageContent }) => {
  const profile = React.useContext(UserContext);
  return (
    <Layout
      title="Trang chu"
      content="Lo trinh hoc tap danh cho lap trinh vien"
      profile={profile}
      maxWidth={false}
    >
      <>
        <Intro
          intro={homePageContent.heading}
          detail={homePageContent.detail}
        />
        <Main maps={maps} />
      </>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const response = await getMapList();
  if (response.data && !response.data.success) {
    return alert("Loi");
  }

  const data = await getHomePageContent()
  console.log(data);
  
  if (data && !data.success) {
    return alert("Loi");
  }

  return { props: { maps: response.data.maps, homePageContent: data.data } };
};

export default Home;
