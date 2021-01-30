export class Song implements ISong {
  id: number;
  name: string;
  singers: ISinger[];
  album: IAlbum;
  url: string;
  lyrics: ILyric;
  constructor(songInfo: any, songUrl: any, lyrics: ILyric) {
    this.id = songInfo.id;
    this.name = songInfo.name;
    this.singers = songInfo.ar.map((singer: ISinger) => {
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

    this.lyrics = lyrics;
  }
}
