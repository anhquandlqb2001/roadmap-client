import { GetStaticPaths } from "next";
import Layout from "../../components/common/Layout";
import {
  getDocumentRaw,
  getDocumentsPath,
  getMapList,
} from "../../lib/api/road";
import "github-markdown-css/github-markdown.css";
import "./index.module.css";
import { Octokit } from "@octokit/core";

const PHP = ({ html }) => {
  return (
    <Layout title="Documentation" profile={{}} content="Tai lieu lo trinh" maxWidth="lg" >
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
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
  const { data } = await getDocumentsPath(params.id);
  if (!data.success) {
    return;
  }

  const path = data.map.documentation.path;
  if (!path) {
    return;
  }

  const response = await getDocumentRaw(path);

  const octokit = new Octokit();

  const res = await octokit.request("POST /markdown", {
    text: response.data,
  });

  return {
    props: {
      html: res.data,
      id: params.id,
    },
  };
};

export default PHP;
