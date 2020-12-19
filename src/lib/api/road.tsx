import axios from "../util/axios.config";
import { MAP_ENDPOINT, MAP_SERVICE_ENDPOINT } from "../util/endpoints.constant";
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
  fieldChange: string;
  currentValue: boolean;
};

export const startMap = async (mapID) => {
  try {
    const response = await axios.post<TDefaultResponse>(
      `${MAP_SERVICE_ENDPOINT}/${mapID}`
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
      `${MAP_ENDPOINT}`
    );
    return response;
  } catch (error) {
    console.log("error in userAPI:, ", error);
  }
};

export const changeFieldMap = async ({
  mapId,
  fieldChange,
  currentValue,
}: TChangeFieldMapParams) => {
  try {
    const response = await axios.put<TDefaultResponse>(
      `${MAP_SERVICE_ENDPOINT}/${mapId}`,
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

export const getMapInfo = async (id) => {
  try {
    return await axios.get<{success: boolean, data: {_id: string, name: string, description: object}}>(`${MAP_ENDPOINT}/${id}`)
  } catch (error) {
    console.log(error);
    
  }
}

export const getDocumentsPath = async (mapId) => {
  try {
    return await axios.get(`${MAP_ENDPOINT}/docs/${mapId}`)
  } catch (error) {
    console.log(error);
  }
}

export const getDocumentRaw = async (path) => {
  try {
    return await axios.get(path)
  } catch (error) {
    console.log(error);
    
  }
}