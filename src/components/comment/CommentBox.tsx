import { Box, TextField, Button, Divider } from "@material-ui/core";
import React from "react";
import { addComment } from "../../lib/api/comment";
import { UserContext } from "../../lib/util/userContext";
import { CommentProps } from "./Comment";

interface CommentBoxProps {
  mapId: string;
  setComment: React.Dispatch<React.SetStateAction<CommentProps[]>>;
}

const CommentBox: React.FC<CommentBoxProps> = ({ mapId, setComment }) => {
  const [newComment, setNewComment] = React.useState<string>("");
  const user = React.useContext(UserContext);

  const onSendComment = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const data = await addComment(mapId, newComment);
    if (!data.success) {
      return alert("error");
    }

    setComment((prev) => [
      {
        commentId: data.data.commentId,
        text: newComment,
        userEmail: user.user.email,
        mapId: mapId,
        hasReply: false,
        createdAt: data.data.createdAt,
      } as CommentProps,
      ...prev,
    ]);
    setNewComment("");
  };

  return (
    <Box my={3}>
      <TextField
        fullWidth
        multiline
        rows={3}
        color={"primary"}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Box my={2}>
        <Button
          fullWidth
          variant={"contained"}
          onClick={(e) => onSendComment(e)}
        >
          Gui
        </Button>
      </Box>
      <Divider />
    </Box>
  );
};

export default CommentBox