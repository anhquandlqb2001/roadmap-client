import axios from "../util/axios.config";
import { ROAD_ENDPOINT } from "../util/endpoints.constant";

class RoadMapAPI {
  // async start(mapName: EMap) {
  //   await axios.post(ADD_NEW_MAP_ENDPOINT, { map: mapName });
  // }

  async start_map(mapID) {
    try {
      const response = await axios.put(`${ROAD_ENDPOINT}/${mapID}/start`);
      console.log(response.data);
      
      return response;
    } catch (error) {
      console.log("error in userAPI:, ", error);
    }
  }

  async get_map(url) {
    try {
      const response = await axios.get(url);
      console.log(response);
      
      return response;
    } catch (error) {
      console.log("error in userAPI:, ", error);
    }
  }

  async get_maps_list() {
    try {
      const response = await axios.get(`${ROAD_ENDPOINT}/list`);
      return response;
    } catch (error) {
      console.log("error in userAPI:, ", error);
    }
  }

  async change_field_map( mapID, ownerMapID, field, currentValue ) {
    try {
      const response = await axios.put(
        `${ROAD_ENDPOINT}/${mapID}/${ownerMapID}`,
        {
          field,
          currentValue,
        }
      );
      return response;
    } catch (error) {
      console.log("error in userAPI:, ", error);
    }
  }
}

export default new RoadMapAPI();
