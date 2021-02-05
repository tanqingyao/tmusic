import PlayerNavBar from "./PlayerNavBar.vue";
import PlayerContent from "./PlayerContent.vue";
import PlayerProgress from "./PlayerProgress.vue";
export { PlayerNavBar, PlayerContent, PlayerProgress };

import { WatchStopHandle } from "vue";
export interface ILyricHandler {
  // 监听器
  watch: {
    lyric: () => WatchStopHandle;
    style: () => WatchStopHandle;
    jump: () => WatchStopHandle;
  };
  //   取消监听
  stop: {
    lyric: WatchStopHandle;
    style: WatchStopHandle;
    jump: WatchStopHandle;
  };
  //   改变歌词样式
  styler: (prevEl: HTMLElement, currentEl: HTMLElement, color: string) => void;
  //   歌词跳转
  jumper: (currentEl: HTMLElement, time: number, offsetY?: number) => void;
}

export interface ILyricInfo {
  lyrics: ILyric[];
  els: HTMLElement[];
}
