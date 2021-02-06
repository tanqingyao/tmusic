<template>
  <div class="recommend-view">
    <div class="list-title">热门歌单推荐</div>
    <RecommendList @RecommedImgLoad="imgload" :album="album" />
  </div>
</template>
<script>
import RecommendList from "./RecommendList";
export default {
  name: "RecommendView",
  components: {
    RecommendList
  },
  props: {
    album: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    imgload() {
      this.$emit("RecommedImgLoad");
    }
  }
};
</script>
<style scoped>
.recommend-view {
  height: 100%;
  overflow: hidden;
}
.list-title {
  height: 65px;
  line-height: 65px;
  text-align: center;
  font-size: var(--font-size-medium);
  color: var(--color-theme);
}
</style>
