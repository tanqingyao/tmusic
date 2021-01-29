export type State = {
  playList: ISong[] | undefined;
  isPlayerFull: boolean;
  autoPlay: boolean;
  currentSong: ISong | undefined;
  isPlaying: boolean;
  expectTime: number;
  duration: number;
  currentTime: number;
};
export const state: State = {
  /* 歌曲信息相关 */
  // searchDefault: { real: "", show: "" },
  playList: undefined,
  /* 播放器相关 */
  isPlayerFull: false,
  autoPlay: true,
  currentSong: undefined,
  isPlaying: false,
  expectTime: 0,
  duration: -1,
  currentTime: 0
};
