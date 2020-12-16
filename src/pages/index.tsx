import React from "react";
import { getMapList, TMaps } from "../lib/api/road";
import Intro from "../components/home.page/Intro";
import Main from "../components/home.page/Main";
import { UserContext } from "../lib/util/userContext";
import { NextPage } from "next";
import Layout from "../components/common/Layout";

interface Props {
  maps: TMaps[];
}

const Home: NextPage<Props> = ({ maps }) => {
  const profile = React.useContext(UserContext);
  return (
    <Layout
      title="Trang chu"
      content="Lo trinh hoc tap danh cho lap trinh vien"
      profile={profile}
    >
      <>
        <Intro
          intro={"LỘ TRÌNH HỌC TẬP DÀNH CHO LẬP TRÌNH VIÊN"}
          detail={`cung cấp các tài liệu và từng bước cụ thể để học một ngôn ngữ, công
nghệ`}
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
  return { props: { maps: response.data.maps } };
};

export default Home;
