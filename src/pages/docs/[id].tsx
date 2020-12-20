import { GetStaticPaths } from "next";
import Layout from "../../components/common/Layout";
import {
  getDocumentRaw,
  getDocumentPath,
  getMapList,
} from "../../lib/api/road";
import "github-markdown-css/github-markdown.css";
import { UserContext } from "../../lib/util/userContext";

import React from 'react'
import Documentation from "../../components/Documentation";

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
  if (!data.success) {
    return;
  }

  const path = data.map.documentation.path;
  if (!path) {
    return;
  }

  const response = await getDocumentRaw(path);

  return {
    props: {
      markdown: response.data,
      id: params.id,
    },
  };
};

export default PHP;
