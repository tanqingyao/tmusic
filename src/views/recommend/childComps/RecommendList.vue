<template>
  <div class="recommend-list">
    <ListItem
      v-for="item in album"
      @click="$router.push('/detail/songlist/' + item.id)"
    >
      <template #img>
        <img :src="item.cover" @load="$emit('RecommedImgLoad')" alt="" />
      </template>

      <template #title>
        <span>{{ item.title }}</span>
      </template>

      <template #btm-left>
        <span>播放量:{{ changeUnit(item.playNum) }}</span>
      </template>
    </ListItem>
  </div>
</template>
<script lang="ts">
import ListItem from "components/content/customList/ListItem.vue";

import { changeUnit } from "@/common/utils/show";
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
  setup() {
    return {
      changeUnit
    };
  }
};
</script>
<style scoped></style>
