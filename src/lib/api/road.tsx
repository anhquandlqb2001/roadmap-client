import axios from "../util/axios.config";
import { ROAD_ENDPOINT } from "../util/endpoints.constant";
import { TDefaultResponse } from "../util/types";

type TGetMapResponse = TDefaultResponse & {
  data: {
    map: any;
    hasStarted: boolean;
    ownerMapId?: string;
  };
};

export type TMaps = {
  _id: string;
  name: string;
  introduction: string;
  stars?: [];
};

type TGetMapsListResponse = {
  success: boolean;
  maps: TMaps[];
};

export type TChangeFieldMapParams = {
  mapId: string;
  ownerMapId: string;
  fieldChange: string;
  currentValue: boolean;
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
      `${ROAD_ENDPOINT}`
    );
    return response;
  } catch (error) {
    console.log("error in userAPI:, ", error);
  }
};

export const changeFieldMap = async ({
  mapId,
  ownerMapId,
  fieldChange,
  currentValue,
}: TChangeFieldMapParams) => {
  try {
    const response = await axios.put<TDefaultResponse>(
      `${ROAD_ENDPOINT}/${mapId}/${ownerMapId}`,
      {
        fieldChange,
        currentValue,
      }
    );
    return response;
  } catch (error) {
    console.log("error in userAPI:, ", error);
  }
};
