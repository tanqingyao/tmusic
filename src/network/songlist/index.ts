import { getNeteaseRequest } from "../request";
import { RecommedTransfrom } from "./model";
const URL_songlist = {
  // 全部歌单,包括分类
  category: "/playlist/catlist",
  // 热门歌单分类
  hot: "/playlist/hot",
  // 精品歌单标签列表
  highquality_tags: "/playlist/highquality/tags",
  // 获取精品歌单
  // limit: 取出歌单数量 , 默认为 20
  // before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
  highquality: "/top/playlist/highquality",
  //   推荐歌单
  personalized: "/personalized"
};

export const getSonglistRecommed = async (limit: number = 30) => {
  const { data } = await getNeteaseRequest({
    url: URL_songlist.personalized,
    params: {
      // 取出数量 , 默认为 30 (不支持 offset)
      limit
    },
    // Response中data此时为string
    transformResponse: data => {
      const songlists = JSON.parse(data).result;
      return RecommedTransfrom(songlists);
    }
  });

  return data;
};
