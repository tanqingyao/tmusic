export const collectSongUrl = res => {
  return res.data.data;
};

export const collectSongInfo = res => {
  return res.data.songs;
};

export const collectSongLyric = res => {
  return res.data;
};

export class Song {
  constructor(songInfo, songUrl, lyrics) {
    this.id = songInfo.id;
    this.name = songInfo.name;
    this.singers = songInfo.ar.map(singer => {
      return {
        id: singer.id,
        name: singer.name
      };
    });
    this.album = {
      id: songInfo.al.id,
      name: songInfo.al.name,
      url: songInfo.al.picUrl
    };

    this.url = songUrl.url;

    this.lyrics = {
      lyric: lyrics.lrc.lyric,
      trans: lyrics.tlyric.lyric,
      user: lyrics.transUser
    };
  }
}
