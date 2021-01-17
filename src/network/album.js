import request from "./request";

export function _getAlbumById(id) {
  let albummid = id;
  return request({
    url: "/album",
    params: {
      albummid
    }
  });
}
