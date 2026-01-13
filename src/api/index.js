import Axios from "../config/axios";
import { ErrorHandler } from "../utils/ErrorHandler";

export const get = async (endPoint, param) => {
  try {
    const result = await Axios.get(endPoint, { params: param });
    if (result.status == 200) return result.data;
    else throw result
  } catch (e) {
    throw ErrorHandler(e)
  }
};

export const post = async (endPoint, data) => {
  try {
    const result = await Axios.post(endPoint, data);
    if (result.status == 200 || result.status == 201) return result.data;
    else throw result
  } catch (e) {
    console.log("🚀 ~ post ~ e:", e)
    throw ErrorHandler(e)
  }
};

export const patch = async (endPoint, data) => {
  try {
    const result = await Axios.patch(endPoint, data);
    if (result.status == 200) return result.data;
    else throw result
  } catch (e) {
    throw ErrorHandler(e)
  }
};

export const put = async (endPoint, data) => {
  try {
    const result = await Axios.put(endPoint, data);
    if (result.status == 200) return result.data;
    else throw result
  } catch (e) {
    throw ErrorHandler(e)
  }
};

export const deleted = async (endPoint) => {
  try {
    const result = await Axios.delete(endPoint);
    if (result.status == 200 || result.status == 204) return result?.data;
    else throw result
  } catch (e) {
    throw ErrorHandler(e)
  }
};
