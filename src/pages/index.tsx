import React from "react";
import { getMapList, TMaps } from "../lib/api/road";
import Intro from "../components/HomePage/Intro";
import Main from "../components/HomePage/Main";
import { UserContext } from "../lib/util/userContext";
import { NextPage } from "next";
import Layout from "../components/Common/Layout";
import { getHomePageContent } from "../lib/api/common";
import { Box } from "@material-ui/core";
import { getOwnerMapList } from "../lib/api/user";
import RoadButton from "../components/HomePage/RoadButton";

interface Props {
  maps: TMaps[];
  homePageContent: {
    heading: string;
    detail: string;
  };
}

const Home: NextPage<Props> = ({ maps, homePageContent }) => {
  const profile = React.useContext(UserContext);
  const [ownerMapList, setOwnerMapList] = React.useState<Array<{_id: string, name: string}>>([])
  React.useEffect(() => {
    const fetchOwnerMapList = async () => {
      if (profile.user) {
        const data = await getOwnerMapList();
        if (!data.success) {
          return;
        }
        return setOwnerMapList(data.ownerMaps)
      }
    }
    fetchOwnerMapList();
  }, [profile.user]);

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
        <Main maps={maps} pathPrefix={"/road"} />
      </>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const response = await getMapList();
  if (response.data && !response.data.success) {
    return alert("Loi");
  }

  const data = await getHomePageContent();
  console.log(data);

  if (data && !data.success) {
    return alert("Loi");
  }

  return { props: { maps: response.data.maps, homePageContent: data.data } };
};

export default Home;
