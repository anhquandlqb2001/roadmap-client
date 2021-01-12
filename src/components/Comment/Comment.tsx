import {
  Paper,
  Box,
  Divider,
  Button,
} from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  getComments,
} from "../../lib/api/comment";
import { UserContext } from "../../lib/util/userContext";
import RequiredLogin from "../Common/RequiredLogin";
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
  const [page, setPage] = React.useState<number>(-1);
  const [comments, setComment] = React.useState<Array<CommentProps>>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(false);
  const loader = React.useRef(null);
  const user = React.useContext(UserContext)
  const router = useRouter()

  const fetchComment = async () => {
    const data = await getComments(page, mapId);
    if (!data.success) {
      return alert("error");
    }
    setComment((prev) => [
      ...prev,
      ...data.comments.map((comment) => {
        return {
          commentId: ((comment as any)._id["$oid"]),
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
    <>
      <h1>Binh luan</h1>
      {user.user ? <CommentBox mapId={mapId} setComment={setComment} user={user} /> : <RequiredLogin pathname="/user/login" next={router.asPath} />}
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
                user={user}
              />
              <Divider variant={"middle"} />
            </Box>
          );
        })}
      </Paper>
      <div className="loading" ref={loader}>
        {hasMore ? <h2>Load More</h2> : null}
      </div>
    </>
  );
};





export default Comment;
