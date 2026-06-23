import { get } from "../index";
import Route from "./Route";

const SearchService = {
  getSearchResult: async (params) => {
    const result = await get(Route.search, params);
    return result;
  }
};

export default SearchService;