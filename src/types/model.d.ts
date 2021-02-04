declare type IBanner = {
  typeTitle: string;
  titleColor: string;
  pic: string;
};

declare type Song = {
  name: string;
  ar: Array<{
    id: number;
    name: string;
  }>;
  al: {
    name: string;
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
  coverImgUrl: string;
  name: string;
  trackCount: number;
  creator: {
    nickname: string;
  };
  playCount: number;
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
    songs: Array<Song>;
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
