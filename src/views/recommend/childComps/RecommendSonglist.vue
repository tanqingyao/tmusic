<template>
  <div class="recommend-song-list">
    <div class="list-title">
      <h3 class="left">推荐歌单</h3>
      <button class="right" @click="handleMore">
        更多
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
    <div
      ref="swiper"
      class="swiper"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div
        class="list-item"
        v-for="item in songlist"
        :key="item.id"
        @click="handleDetail(item.id)"
      >
        <div class="cover">
          <div class="play-count right">
            <font-awesome-icon :icon="['fas', 'play']" size="sm" />
            {{ changeUnit(item.playCount, 10000, 0) }}
          </div>
          <img :src="item.cover" alt="封面图片" />
        </div>

        <div class="title">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from "vue";

import { changeUnit } from "common/utils";
export default defineComponent({
  name: "RecommendSonglist",
  components: {},
  props: {
    songlist: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup() {
    /* 滑动相关 */
    let startX = 0;
    let distance = 0;
    let currentPos = 0;
    const swiper = ref(null);
    // 可滑动最长距离
    const totleWidth = computed(() => {
      let totle = 0;
      for (let item of swiper.value.children) {
        totle += item.offsetWidth;
      }
      return totle - swiper.value.offsetWidth;
    });
    const setTransfrom = position => {
      // 设置移动位置
      swiper.value.style.transform = `translate(${position}px, 0)`;
    };
    const handleTouchStart = e => {
      startX = e.touches[0].pageX;
    };
    const handleTouchMove = e => {
      // 元素移动位置 = 当前距离 + 滑动距离
      distance = currentPos + (e.touches[0].pageX - startX);
      if (distance > -totleWidth.value && distance < 0) {
        setTransfrom(distance);
      }
    };
    const handleTouchEnd = () => {
      currentPos = distance;
    };

    /* 点击相关 */
    const handleMore = () => {
      console.log("进入歌单广场");
    };

    const handleDetail = id => {
      console.log("进入详情页", id);
    };
    return {
      changeUnit,
      swiper,
      totleWidth,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,

      handleMore,
      handleDetail
    };
  }
});
</script>
<style scoped>
.recommend-song-list {
  border-top: 1px solid #ddd;
  margin-top: 10px;
  overflow: hidden;
}
.list-title {
  height: 20px;
  line-height: 20px;
  padding: 0 10px;
  margin-top: 10px;
  font-size: var(--font-size-medium);
  color: var(--color-theme);
}
.list-title button {
  font-size: 14px;
  height: 22px;
  width: 60px;
  border-radius: 10px;
  border: solid 1px #bbb;
  outline: none;
}
.swiper {
  display: flex;
}
.list-item {
  flex: 1;
}
.play-count {
  color: #fff;
  font-size: 12px;
  border-radius: 10px;
  background-color: var(--color-background-d);

  position: relative;
  top: 25px;
  margin-right: 10px;
  padding: 3px 7px;
}
.list-item img {
  width: 100px;
  border-radius: 10px;
  margin: 0 5px;
  box-shadow: 0px -10px 2px -5px rgba(0, 0, 0, 0.1);
}
.list-item .title {
  font-size: 12px;
  padding: 0 10px;
  /* 显示两行,多余省略 */
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
