import axios from "../util/axios.config";
import { ROAD_ENDPOINT } from "../util/endpoints.constant";

type TDefaultResponse = {
  success: boolean;
  message?: string;
};

type TGetMapResponse = TDefaultResponse & {
  data: {
    map: any;
    has_started: boolean;
    owner_map_id?: string;
  };
};

type TRoad = {
  _id: string;
  name: string;
  intro: string;
  stars?: [];
};

type TGetMapsListResponse = {
  success: boolean;
  roads: TRoad[];
};

export const startMap = async (mapID) => {
  try {
    const response = await axios.put<TDefaultResponse>(
      `${ROAD_ENDPOINT}/${mapID}/start`
    );
    return response;
  } catch (error) {
    console.log("error in userAPI:, ", error);
  }
};

export const getMap = async (url: string) => {
  try {
    const response = await axios.get<TGetMapResponse>(url);
    return response;
  } catch (error) {
    console.log("error in userAPI:, ", error);
  }
};

export const getMapList = async () => {
  try {
    const response = await axios.get<TGetMapsListResponse>(
      `${ROAD_ENDPOINT}/list`
    );
    return response;
  } catch (error) {
    console.log("error in userAPI:, ", error);
  }
};

export const changeFieldMap = async (
  mapID,
  ownerMapID,
  field,
  currentValue
) => {
  try {
    const response = await axios.put<TDefaultResponse>(
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
};