import { del, get, patch, post } from "../utils/request";

export const getCVIdCompany= async (id) => {
  const result = await get(`cv?idCompany=${id}`);
  return result;
}

export const deleteCV= async (id) => {
  const result = await del(`cv/${id}`);
  return result;
}

export const getCVById= async (id) => {
  const result = await get(`cv/${id}`);
  return result;
}

export const updateCV= async (id, options) => {
  const result = await patch(`cv/${id}`,options);
  return result;
}

export const createCV= async (options) => {
  const result = await post(`cv`,options);
  return result;
}