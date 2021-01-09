import { Box } from "@material-ui/core";
import Link from "next/link";
import React from "react";

interface Props {
  pathname: string;
  next?: string;
}

const RequiredLogin: React.FC<Props> = ({ pathname, next }) => {
  return (
    <Box my={2} display={"flex"} alignItems={"center"}>
      <p>
        Ban can dang nhap moi co the binh luan!!&nbsp;
        <Link href={`${pathname}/?next=${encodeURIComponent(next)}`}>
          <a>Dang nhap ngay</a>
        </Link>
      </p>
    </Box>
  );
};

export default RequiredLogin;
