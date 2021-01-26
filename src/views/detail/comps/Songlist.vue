<template>
  <div class="song-list">
    <MusicListItem v-for="item in songlist" @click="songClick(item)">
      <template #title>
        <span>{{ item.songname }}</span>
      </template>

      <template #btm-left>
        {{ item.singer[0].name }}
      </template>
      <template #btm-right>
        {{ item.albumname }}
      </template>
    </MusicListItem>
  </div>
</template>
<script>
import MusicListItem from "components/content/musicList/MusicListItem";

import { _getSonglistById } from "network/detail";

import { SET_CURRENT_SONG, SET_FULL_PLAYER } from "store/mutations-types";
export default {
  name: "Songlist",
  components: { MusicListItem },
  props: {
    songlist: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    songClick(item) {
      this.$store
        .dispatch("addToPlayList", item)
        .then(song => {
          if (song) {
            this.$toast.show("成功添加歌曲~", 1500);
            // 自动跳转到player页面
            this.$store.commit(SET_FULL_PLAYER, true);
          } else {
            this.$toast.show("添加失败", 1500);
          }
          if (this.$store.state.autoPlay) {
            this.$store.commit(SET_CURRENT_SONG, song);
          }
        })
        .catch(err => {
          console.warn(err);
        });
    }
  }
};
</script>
<style scoped></style>
