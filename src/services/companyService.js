import { get, patch, post } from "../utils/request";

export const getCompany= async () => {
  const result = await get("company");
  return result;
}

export const getCompanyById= async (id) => {
  const result = await get(`company/${id}`);
  return result;
}

export const getCompanyByPhone= async (phone) => {
  const result = await get(`company?phone=${phone}`);
  return result;
}

export const getCompanyByEmail= async (email) => {
  const result = await get(`company?email=${email}`);
  return result;
}

export const createCompany= async (options) => {
  const result = await post(`company`,options);
  return result;
}

export const getCompanyByPassAndEmail= async (password,email) => {
  const result = await get(`company?password=${password}&email=${email}`);
  return result;
}

export const updateCompany= async (id,options) => {
  const result = await patch(`company/${id}`,options);
  return result;
}