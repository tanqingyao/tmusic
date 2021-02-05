import { computed, Ref } from "vue";
import { debounce } from "@/common/utils/func";
import { ILyricHandler, ILyricInfo } from "../index";
export default function lyricTouch(
  emit: ((event: "touching", ...args: any[]) => void) &
    ((event: "scrollTime", ...args: any[]) => void),
  verticalOffset: number,
  lrcInfo: ILyricInfo,
  H: ILyricHandler
) {
  let isTouch = false;
  let currentTouchEl: HTMLElement;
  let oldTouchEl: HTMLElement;

  // 每行歌词滚动高度
  const scrollY = computed(() =>
    lrcInfo.els.map((el: HTMLElement) =>
      el ? el.offsetTop + 0.5 * el.offsetHeight : 0
    )
  );

  const debouncedTouchEnd = debounce(() => {
    H.stop.jump = H.watch.jump();
    emit("touching", false);
    isTouch = false;
  }, 5000);

  const handleTouchStart = () => {
    isTouch = true;
    emit("touching", true);
    H.stop.jump();
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
        Math.abs(scrollTop - el) < 0.5 * lrcInfo.els[i].offsetHeight
    );
    if (index !== -1) {
      //滚动时歌词样式
      oldTouchEl = currentTouchEl;
      currentTouchEl = lrcInfo.els[index];
      H.styler(oldTouchEl, currentTouchEl, "#999");
      // 时间戳
      emit("scrollTime", lrcInfo.lyrics[index].time);
    }
  };

  return {
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove
  };
}
