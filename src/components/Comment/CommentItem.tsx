import { Paper, Avatar, Box, Divider, Grid, List } from "@material-ui/core";
import React from "react";
import { getReply } from "../../lib/api/comment";
import { ReplyProps } from "./ReplyItem";
import ReplyBox from "./ReplyBox";
import styled from "styled-components";
import ReplyItem from "./ReplyItem";

interface CommentItemProps {
  commentId: string;
  text: string;
  author: string;
  mapId: string;
  createdAt: Date;
  hasReply: boolean;
  user: {
    user: any;
    map: any;
  };
}

const CommentItem = ({
  text,
  author,
  commentId,
  mapId,
  createdAt,
  hasReply,
  user,
}: CommentItemProps) => {
  const [showReplys, setShowReplys] = React.useState(false);
  const [openReplyBox, setOpenReplyBox] = React.useState(false);
  const [hasMore, setHasMore] = React.useState<boolean>(false);
  const [replys, setReplys] = React.useState<Array<ReplyProps>>([]);
  const [page, setPage] = React.useState<number>(0);

  const fetchReply = async () => {
    const data = await getReply(mapId, commentId, page);
    if (!data.success) {
      return alert("error");
    }
    setReplys((prev) => [
      ...prev,
      ...data.replys.map((reply: any) => {
        return {
          commentId: reply.commentId,
          replyId: reply._id,
          mapId: mapId,
          text: reply.text,
          author: reply?.userEmail,
          createdAt: reply.createdAt,
        };
      }),
    ]);
    setHasMore(data.hasMore);
  };

  React.useEffect((): void => {
    if (!showReplys) return;
    fetchReply();
  }, [showReplys]);

  React.useEffect((): void => {
    if (!hasMore) {
      return;
    }
    fetchReply();
  }, [page]);

  const viewMoreReplyBtn = () => {
    if (showReplys && hasMore) {
      return "Xem them";
    }
    return null;
  };

  return (
    <Box style={{ padding: "20px 10px" }}>
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
      {showReplys ? (
        <StyledPaper style={{ marginLeft: "20px", marginBottom: "10px" }}>
          <List>
            {replys.map((reply) => {
              return (
                <Box key={reply.replyId}>
                  <ReplyItem
                    text={reply.text}
                    author={reply.author}
                    createdAt={reply.createdAt}
                  />
                  <Divider variant={"middle"} />
                </Box>
              );
            })}
          </List>
        </StyledPaper>
      ) : (
        ""
      )}
      {openReplyBox ? (
        <ReplyBox setReplys={setReplys} mapId={mapId} commentId={commentId} />
      ) : (
        ""
      )}
      {user.user && !openReplyBox && (
        <StyledReplyComment
          onClick={(_) => {
            setOpenReplyBox(true);
            setShowReplys(true);
          }}
        >
          Tra loi
        </StyledReplyComment>
      )}
      {hasReply ? (
        <>
          <StyledReplyComment onClick={(_) => setShowReplys(true)}>
            {!showReplys ? "Xem tra loi binh luan" : null}
          </StyledReplyComment>
          <StyledReplyComment
            onClick={(_) => setPage((prevPage) => prevPage + 1)}
          >
            {viewMoreReplyBtn()}
          </StyledReplyComment>
        </>
      ) : null}
    </Box>
  );
};

const StyledPaper = styled(Paper)`
  padding-top: 10px;
  padding-left: 10px;
`;

const StyledReplyComment = styled("a")`
  text-decoration: underline;
  cursor: pointer;
  margin: 20px;
`;

export default CommentItem;
