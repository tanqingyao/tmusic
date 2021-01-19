<template>
  <div class="recommend-list">
    <MusicListItem v-for="item in album" @click="songClick(item.id)">
      <template #img>
        <img :src="item.cover" @load="imgload" alt="" />
      </template>

      <template #title>
        <span>{{ item.title }}</span>
      </template>

      <template #btm-left>
        <span>播放量:{{ unitChange(item.playNum) }}万</span>
      </template>
    </MusicListItem>
  </div>
</template>
<script>
import MusicListItem from "components/content/musicList/MusicListItem";
export default {
  name: "RecommendList",
  components: {
    MusicListItem
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
    unitChange(value) {
      return (value / 10000).toFixed(2);
    },
    imgload() {
      this.$emit("RecommedImgLoad");
    },
    songClick(id) {
      // console.log(id);
      this.$router.push("/detail/songlist/" + id);
    }
  }
};
</script>
<style scoped></style>
