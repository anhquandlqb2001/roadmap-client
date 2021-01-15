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
        Bạn cần đăng nhập mới có thể sử dụng chức năng này!!&nbsp;
        <Link href={`${pathname}/?next=${encodeURIComponent(next)}`}>
          <a>Đăng nhập ngay</a>
        </Link>
      </p>
    </Box>
  );
};

export default RequiredLogin;
