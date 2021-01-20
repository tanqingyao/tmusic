import request from "./request";

export function getSearchData(params) {
  return request({
    url: "/search",
    params: {
      key,
      pageNo,
      pageSize
    }
  });
}
export function getHotSearch(params) {
  return request({
    url: "/search/hot"
  });
}
