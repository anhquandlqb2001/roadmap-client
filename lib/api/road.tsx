import axios from "../util/axios.config";
import { ADD_NEW_MAP_ENDPOINT } from "../util/constant";
import { EMap } from "../util/types";

class RoadMapAPI {
  async start(mapName: EMap) {
    await axios.post(ADD_NEW_MAP_ENDPOINT, { map: mapName });
  }
}

export default new RoadMapAPI();
