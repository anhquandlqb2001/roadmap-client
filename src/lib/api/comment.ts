import { CommentProps } from "../../components/comment/Comment";
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
    const response = await axios.get(`${ENDPOINT}/comment/${mapId}/${page}`);
    return response.data;
  } catch (error) {}
};

export const addComment = async (
  mapId: string,
  text: string
): Promise<{ success: boolean, data: {commentId: string, createdAt: Date} }> => {
  try {
    const response = await axios.post(`${ENDPOINT}/service/comment/${mapId}`, {
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
      `${ENDPOINT}/service/comment/${mapId}/${commentId}/reply`,
      { text }
    );
    return response.data
  } catch (error) {}
};

export const getReply = async (mapId: string, commentId: string, page = 0): Promise<{success: boolean, replys: [], hasMore: boolean}> => {
  try {
    const response = await axios.get(`${ENDPOINT}/comment/${mapId}/${commentId}/reply/${page}`)
    return response.data
  } catch (error) {
    
  }
}