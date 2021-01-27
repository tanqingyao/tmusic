import { ref } from "vue";

import { debounce } from "common/utils";
import { scrollToElement } from "common/scroll";
export default function lyricTouch(
  emit,
  jumpWatcher,
  unwatchJump,
  currentLyricRef,
  lyricTrimLength,
  lyricLength,
  lyricsArr,
  lyricTrim
) {
  let isTouch = ref(false);
  let currentTouchRef = ref({});
  let oldTouchRef = ref({});
  console.log(unwatchJump);
  let stopJump = unwatchJump;
  const debouncedTouchEnd = debounce(() => {
    isTouch.value = false;
    scrollToElement(currentLyricRef.value);
    // scroll.value.scrollTo(-currentLyricRef.value.offsetTop + 255);
    console.log(stopJump);
    console.log(jumpWatcher);
    stopJump = jumpWatcher();
    console.log(stopJump);
    emit("touching", false);
  }, 5000);
  const handleTouchStart = () => {
    isTouch.value = true;
    emit("touching", true);

    // 长按情况，取消歌词跳动
    if (debouncedTouchEnd) {
      debouncedTouchEnd.cancel();
    }
    console.log(stopJump);
    if (stopJump) {
      stopJump();
    }
  };
  const handleTouchEnd = () => {
    isTouch.value = false;
    // 频繁滑动情况，防抖处理
    debouncedTouchEnd();
  };
  const handleTouch = pos => {
    if (!isTouch.value) {
      console.log("isScrolling", pos);
      return;
    }
    console.log("isTouching", pos);
    //40px一个el
    const counter = Math.floor((Math.abs(pos.y) + 20) / 40);
    if (counter < lyricTrimLength.value) {
      emit("scrollTime", lyricTrim.value[counter].time);
    }
    const index = counter + lyricLength.value - lyricTrimLength.value;

    //滚动时歌词样式
    oldTouchRef.value = currentTouchRef.value;
    currentTouchRef.value = lyricsArr.value.el[index];
    if (oldTouchRef.value && oldTouchRef.value.style) {
      oldTouchRef.value.style.color = "";
    }
    if (currentTouchRef.value) {
      currentTouchRef.value.style.color = "#999";
    }
  };
  return {
    isTouch,
    debouncedTouchEnd,
    handleTouchStart,
    handleTouchEnd,
    handleTouch
  };
}
