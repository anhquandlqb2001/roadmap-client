import { Box, Grid, Avatar } from "@material-ui/core";
import React from "react";
export interface ReplyProps {
  commentId: string;
  replyId: string;
  mapId: string;
  text: string;
  author: string;
  createdAt: Date;
}

interface ReplyItemProps {
  text: string;
  author: string;
  commentId?: string;
  replyId?: string;
  createdAt: any;
}

const ReplyItem: React.FC<ReplyItemProps> = ({ text, author, createdAt }) => {
  return (
    <Box mt={2}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" />
        </Grid>
        <Grid item xs>
          <h4 style={{ margin: 0, textAlign: "left" }}>{author}</h4>
          <p style={{ textAlign: "left" }}>{text} </p>
          <p style={{ textAlign: "left", color: "gray" }}>
            {new Date(createdAt).toLocaleDateString("vi-VN") +
              " " +
              new Date(createdAt).toLocaleTimeString()}
          </p>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReplyItem