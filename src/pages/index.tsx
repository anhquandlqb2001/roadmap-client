import React from "react";
import Intro from "../components/HomePage/Intro";
import Main from "../components/HomePage/Main";
import Layout from "../components/Common/Layout";
import { NextPage } from "next";
import fs from 'fs'
import path from 'path'

type Props = {
  maps: []
}

const Home: NextPage<Props> = ({ maps }) => {

  return (
    <Layout
      title="Trang chủ"
      content="Lộ trình học tập"
      maxWidth={false}
    >
      <>
        <Intro
          intro={"abc"}
          detail={"bcd"}
        />
        <Main maps={maps} />
      </>
    </Layout>
  );
};

export const getStaticProps = async () => {
  let filenames: string[] = []
  try {
    const postsDirectory = path.join(process.cwd(), 'src/lib/maps')
    filenames = fs.readdirSync(postsDirectory)
  } catch (error) {
    console.log(error);
  }
  
  const maps = filenames.map((filename, index) => {
    return {_id: index.toString(), name: filename.split('.')[0], introduction: ''}
  })

  return { props: { maps: maps } };
};

export default Home;
