<template>
  <div>solo</div>
  <!-- <div class="recommend-list">
    <ListItem v-for="item in album" @click="songClick(item.id)">
      <template #img>
        <img :src="item.cover" @load="imgload" alt="" />
      </template>

      <template #title>
        <span>{{ item.title }}</span>
      </template>

      <template #btm-left>
        <span>播放量:{{ unitChange(item.playNum) }}万</span>
      </template>
    </ListItem>
  </div> -->
</template>
<script>
import ListItem from "components/content/musicList/ListItem";
export default {
  name: "RecommendList",
  components: {
    ListItem
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
