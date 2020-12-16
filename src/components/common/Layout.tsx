import Head from "next/head";
import { UserContext } from "../../lib/util/userContext";
import NavBar from "../home.page/NavBar";
import React from "react";

type Props = {
  title: string;
  content: string;
  children: JSX.Element;
  profile;
};

const Layout = ({
  children,
  title,
  content = "Lo trinh hoc tap danh cho lap trinh vien",
  profile,
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      <main>
        <NavBar profile={profile} />
        {children}
      </main>

      <footer>quanprolazer@copyright</footer>
    </>
  );
};

export default Layout;
