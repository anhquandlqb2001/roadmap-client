import { Box, TextField, Button } from "@material-ui/core";
import React from "react";
import { addReply } from "../../lib/api/comment";
import { UserContext } from "../../lib/util/userContext";
import { ReplyProps } from "./ReplyItem";

interface ReplyBoxProps {
  setReplys: React.Dispatch<React.SetStateAction<ReplyProps[]>>;
  mapId: string;
  commentId: string;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({ setReplys, mapId, commentId }) => {
  const user = React.useContext(UserContext);
  const [replyText, setReplyText] = React.useState<string>("");

  const onSendReply = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const data = await addReply(mapId, commentId, replyText);
    if (!data.success) {
      return alert("error");
    }
    setReplys((prev) => [
      ...prev,
      {
        commentId,
        mapId,
        text: replyText,
        replyId: data.data.replyId,
        author: user.user.email,
        createdAt: data.data.createdAt,
      },
    ]);
    setReplyText("");
  };

  return (
    <Box my={1}>
      <TextField
        fullWidth
        multiline
        rows={2}
        color={"primary"}
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <Box my={1}>
        <Button variant={"contained"} onClick={(e) => onSendReply(e)}>
          Gửi
        </Button>
      </Box>
      {/* <Divider /> */}
    </Box>
  );
};
export default ReplyBox;
