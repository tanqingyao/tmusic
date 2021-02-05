export class Song implements ISong {
  id: number;
  name: string;
  singers: ISinger[];
  album: IAlbum;
  url: string;
  private _lyrics?: ILyric;
  constructor(songInfo: any, songUrl: any) {
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
  }
  // get lyrics(): ILyric {
  //   console.log("getter: " + this.lyrics);
  //   return this.lyrics;
  // }
  // set lyrics(value) {
  //   console.log("setter: " + this.lyrics);
  // }
}
