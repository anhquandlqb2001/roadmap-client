import { CommentProps } from "../../components/Comment/Comment";
import axios from "../util/axios.config";
import { ENDPOINT } from "../util/endpoints.constant";

export const getComments = async (
  page: number,
  mapId: string
): Promise<{
  success: boolean;
  comments: Array<CommentProps>;
  hasMore: boolean
}> => {
  try {
    const response = await axios.get(`${ENDPOINT}/comment/index.php?action=getListComment&mapId=${mapId}&page=${page}`);
    return response.data;
  } catch (error) {}
};

export const addComment = async (
  mapId: string,
  text: string
): Promise<{ success: boolean, data: {commentId: string, createdAt: Date} }> => {
  try {
    const response = await axios.post(`${ENDPOINT}/comment/index.php?action=addComment&mapId=${mapId}`, {
      text,
    });
    return response.data;
  } catch (error) {}
};

export const addReply = async (
  mapId: string,
  commentId: string,
  text: string
): Promise<{ success: boolean, data: {replyId: string, createdAt: Date} }> => {
  try {
    const response = await axios.put(
      `${ENDPOINT}/comment/index.php?action=addReply&mapId=${mapId}&commentId=${commentId}`,
      { text }
    );
    return response.data
  } catch (error) {}
};

export const getReply = async (mapId: string, commentId: string, page = 0): Promise<{success: boolean, replys: [], hasMore: boolean}> => {
  try {
    const response = await axios.get(`${ENDPOINT}/comment/index.php?action=getListReply&commentId=${commentId}&page=${page}`)
    return response.data
  } catch (error) {
    
  }
}