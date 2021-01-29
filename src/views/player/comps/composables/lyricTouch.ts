import { computed, Ref, ref, WatchStopHandle } from "vue";
import { debounce } from "@/common/utils";
export default function lyricTouch(
  emit: (event: string, ...args: unknown[]) => void,
  jumpWatcher: WatchStopHandle,
  styler: (prevEl: HTMLElement, currentEl: HTMLElement, color: string) => void,
  lyricsArr: Ref,
  verticalOffset: number
) {
  let isTouch = false;
  let currentTouchEl: HTMLElement;
  let oldTouchEl: HTMLElement;

  let unwatchJump: Ref = ref(null);

  // 每行歌词滚动高度
  const scrollY = computed(() =>
    lyricsArr.value.el.map(
      (el: HTMLElement) => el.offsetTop + 0.5 * el.offsetHeight
    )
  );

  const debouncedTouchEnd = debounce(() => {
    unwatchJump.value = jumpWatcher();
    emit("touching", false);
    isTouch = false;
  }, 5000);

  const handleTouchStart = () => {
    isTouch = true;
    emit("touching", true);
    unwatchJump.value();
    // 长按情况，取消歌词跳动
    if (debouncedTouchEnd) {
      debouncedTouchEnd.cancel();
    }
  };

  const handleTouchEnd = () => {
    debouncedTouchEnd();
  };

  const handleTouchMove = (pos: { y: number }) => {
    // 跳过处理自动滚动
    if (!isTouch) {
      return;
    }
    // 已默认偏移255px
    const scrollTop = Math.abs(pos.y) + verticalOffset;
    const index = scrollY.value.findIndex(
      (el: number, i: number) =>
        Math.abs(scrollTop - el) < 0.5 * lyricsArr.value.el[i].offsetHeight
    );
    if (index !== -1) {
      //滚动时歌词样式
      oldTouchEl = currentTouchEl;
      currentTouchEl = lyricsArr.value.el[index];
      styler(oldTouchEl, currentTouchEl, "#999");
      // 时间戳
      emit("scrollTime", lyricsArr.value.lyric[index].time);
    }
  };

  return {
    unwatchJump,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove
  };
}
