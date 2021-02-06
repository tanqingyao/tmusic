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

interface SonglistCover {
  id: number;
  picUrl: string;
  name: string;
  playCount: number;
}
declare type Songlist = {
  id: number;
  coverImgUrl: string;
  name: string;
  creator: { avatarUrl: string; nickname: string };
  description: string;
  subscribedCount: number;
  trackCount: number;
  playCount: number;
  shareCount: number;
  commentCount: number;

  trackIds: { id: number }[];
};

declare type Artist = {
  accountId: number;
  picUrl: string;
  name: string;
  alias: Array<string>;
};

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

declare type User = {
  userId: number;
  followed: boolean;
  avatarUrl: string;
  nickname: string;
  signature: string;
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
