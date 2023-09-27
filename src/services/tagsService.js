import { get } from "../utils/request";

export const getTags= async () => {
  const result = await get("tags");
  return result;
}