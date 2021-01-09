import {
  Paper,
  Box,
  Divider,
} from "@material-ui/core";
import React from "react";
import {
  getComments,
} from "../../lib/api/comment";
import CommentBox from './CommentBox'
import CommentItem from "./CommentItem";


export interface CommentProps {
  commentId: string;
  mapId: string;
  text: string;
  userEmail: string;
  hasReply: boolean;
  createdAt: Date;
}

interface Props {
  mapId: string;
}

const Comment: React.FC<Props> = ({ mapId }) => {
  const [page, setPage] = React.useState<number>(0);
  const [comments, setComment] = React.useState<Array<CommentProps>>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(false);
  const loader = React.useRef(null);

  const fetchComment = async () => {
    const data = await getComments(page, mapId);
    if (!data.success) {
      return alert("error");
    }
    setComment((prev) => [
      ...prev,
      ...data.comments.map((comment) => {
        return {
          commentId: comment.commentId,
          mapId: mapId,
          text: comment.text,
          userEmail: comment?.userEmail,
          hasReply: comment.hasReply,
          createdAt: comment.createdAt,
        };
      }),
    ]);
    setHasMore(data.hasMore);
  };

  React.useEffect((): void => {
    fetchComment();
  }, []);

  React.useEffect(() => {
    let options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  React.useEffect(() => {
    // here we simulate adding new posts to List
    if (!hasMore) {
      return;
    }
    fetchComment();
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  return (
    <div style={{ padding: 14 }} className="App">
      <h1>Comments</h1>
      <CommentBox mapId={mapId} setComment={setComment} />
      <Paper>
        {comments.map((comment) => {
          return (
            <Box key={comment.commentId}>
              <CommentItem
                commentId={comment.commentId}
                text={comment.text}
                author={comment.userEmail}
                mapId={mapId}
                createdAt={comment.createdAt}
                hasReply={comment.hasReply}
              />
              <Divider variant={"middle"} />
            </Box>
          );
        })}
      </Paper>
      <div className="loading" ref={loader}>
        {hasMore ? <h2>Load More</h2> : null}
      </div>
    </div>
  );
};





export default Comment;
