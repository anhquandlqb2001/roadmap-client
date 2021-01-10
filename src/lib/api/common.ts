import axios from "../util/axios.config";
import { ENDPOINT } from "../util/endpoints.constant";

export const getHomePageContent = async () => {
  try {
    const response = await axios.get(`${ENDPOINT}/common/homepage`)
    return response.data
  } catch (error) {
    
  }
}