declare type IBanner = {
  typeTitle: string;
  titleColor: string;
  pic: string;
};

declare type SongInfo = {
  id: number;
  name: string;
  ar: Array<{
    id: number;
    name: string;
  }>;
  al: {
    id: number;
    name: string;
    picUrl: string;
  };
  alia: Array<string>;
  mv: number;
};

declare interface Songlist {
  id: number;
  // 封面
  coverImgUrl: string;
  picUrl: string;

  name: string;
  creator?: IUser;
  description: string;
  subscribedCount: number;
  trackCount: number;
  playCount: number;
  shareCount: number;
  commentCount: number;

  trackIds: { id: number }[];
}

declare interface IArtist {
  id: number;
  name: string;
  // 头像图片
  imgUrl: string;
  account: IUser;

  score?: number;
  lastRank?: number;
  alias?: Array<string>;
}

declare interface IUser {
  id: number;
  nickname?: string;
  followed?: boolean;
  avatarUrl?: string;
  signature?: string;
  description?: string;
  detailDescription?: string;
}
declare type Album = {
  picUrl: string;
  name: string;
  alias: Array<string>;
  artist: Array<{
    id: number;
    name: string;
  }>;
  publishTime: number;
};

declare type Complex = {
  song: {
    moreText: string;
    songs: Array<SongInfo>;
  };
  playList: {
    moreText: string;
    playLists: Array<Songlist>;
  };
  artist: {
    moreText: string;
    artists: Array<Artist>;
  };
  album: {
    moreText: string;
    albums: Array<Album>;
  };
  user: {
    moreText: string;
    users: Array<User>;
  };
  sim_query: {
    sim_querys: Array<{
      keyword: string;
    }>;
  };
};
