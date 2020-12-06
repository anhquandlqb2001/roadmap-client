import React from "react";

type BoxProps = {
  margin?: string
  children: JSX.Element
}

const Box = ({ margin, children }: BoxProps) => {
  return <div style={{ margin }}>{children}</div>;
};

export default Box;
