import { GetStaticPaths } from "next";
import Layout from "../../components/Common/Layout";
import {
  getDocumentRaw,
  getDocumentPath,
  getMapList,
} from "../../lib/api/road";
import "github-markdown-css/github-markdown.css";
import { UserContext } from "../../lib/util/userContext";

import React from "react";
import Documentation from "../../components/Documentation/Documentation";

const PHP = ({ markdown }) => {
  const profile = React.useContext(UserContext);

  return (
    <Layout
      title="Documentation"
      profile={profile}
      content="Tai lieu lo trinh"
      maxWidth="lg"
    >
      <Documentation markdown={markdown} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await getMapList();
  const paths = data.maps.map((map) => ({
    params: { id: map._id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { data } = await getDocumentPath(params.id);
  
  const path = data.data.documentation.path;

  const response = await getDocumentRaw(path);

  return {
    props: {
      markdown: response.data,
      id: params.id,
    },
  };
};

export default PHP;
