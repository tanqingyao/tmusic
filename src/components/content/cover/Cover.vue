<template>
  <div class="cover">
    <div class="play-count right">
      <icon :icon="['fas', 'play']" size="sm" />
      {{ changeUnit(item.playCount, 10000, 0) }}
    </div>
    <img v-lazy="item.cover" alt="封面图片" />
    <div class="title" v-show="showTitle">
      {{ item.title }}
    </div>
  </div>
</template>
<script lang="ts">
import { changeUnit } from "@/common/utils/show";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Cover",
  components: {},
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    return {
      changeUnit
    };
  }
});
</script>
<style scoped>
.cover {
  flex: 1;
}
.cover .play-count {
  color: #fff;
  font-size: 12px;
  border-radius: 10px;
  background-color: var(--color-background-shadow);

  position: relative;
  top: 25px;
  margin-right: 10px;
  padding: 3px 7px;
}
.cover img {
  width: 110px;
  border-radius: 10px;
  margin: 0 5px;
  box-shadow: 0px -10px 2px -5px rgba(0, 0, 0, 0.1);
}
.cover .title {
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
