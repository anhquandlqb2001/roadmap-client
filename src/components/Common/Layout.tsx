import Head from "next/head";
import NavBar from "../Navbar/NavBar";
import React from "react";
import { Container } from "@material-ui/core";

type Props = {
  title: string;
  content: string;
  children: JSX.Element;
  maxWidth?: false | "xl" | "xs" | "sm" | "md" | "lg";
  profile;
};

const Layout = ({
  children,
  title,
  content = "Lộ trình học tập dành cho lập trình viên",
  maxWidth = "xl",
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
          <Container maxWidth={maxWidth}>{children}</Container>
        </main>

        {/* <footer>quanprolazer@copyright</footer> */}
    </>
  );
};

export default Layout;
