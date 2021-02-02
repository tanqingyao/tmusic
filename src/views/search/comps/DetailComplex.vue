<template>
  <div class="complex-body">
    <div v-for="item in complex">
      <ListCard v-if="item">
        <template #header>
          <span class="left">{{ item.title }}</span>
          <button
            class="right solo-play-btn"
            @click="handlePlayAll"
            v-if="item.title === '单曲'"
          >
            <icon :icon="['fas', 'play']" size="sm" />
            播放
          </button>
        </template>

        <template #content>
          <div class="solo" v-if="item.title === '单曲'">
            <ListItem
              v-for="(item, index) in item.songs"
              @click="handleClickItem(item)"
            >
              <template #top>
                <span>{{ item.name }}</span>
              </template>
              <template #bottom>
                <span>{{ showSinger(item.ar) }} - </span>

                <span> {{ item.al.name }}</span>
              </template>
              <template #right>
                <icon
                  class="icon"
                  :icon="['fas', 'video']"
                  :style="{ color: '#999' }"
                  @click="handleVideo"
                />
                <icon
                  class="icon"
                  :icon="['fas', 'ellipsis-v']"
                  :style="{ color: '#999' }"
                  @click="handleSetting"
                />
              </template>
            </ListItem>
          </div>

          <div class="playlist" v-if="item.title === '歌单'">
            <ListItem
              v-for="(item, index) in item.playLists"
              @click="handleClickItem(item)"
            >
              <template #left>
                <img class="playlist-cover" :src="item.coverImgUrl" alt="" />
              </template>
              <template #top>
                {{ item.name }}
              </template>
              <template #bottom>
                <span>{{ item.trackCount }}首，</span>
                <span v-if="item.creator">
                  by {{ item.creator.nickname }}，
                </span>
                <span> 播放{{ item.playCount }}次</span>
              </template>
            </ListItem>
          </div>

          <div class="artist" v-if="item.title === '艺人'">
            <ListItem
              v-for="(item, index) in item.artists"
              @click="handleClickItem(item)"
            >
              <template #left>
                <img class="artist-cover" :src="item.picUrl" alt="" />
              </template>
              <template #top>
                <span>{{ item.name }}</span>
                <span v-if="item.alias[0]"> ({{ item.alias[0] }}) </span>
              </template>
            </ListItem>
          </div>

          <div class="artist" v-if="item.title === '专辑'">
            <ListItem
              v-for="(item, index) in item.albums"
              @click="handleClickItem(item)"
            >
              <template #left>
                <img class="artist-cover" :src="item.picUrl" alt="" />
              </template>
              <template #top>
                <span>{{ item.name }}</span>
                <span v-if="item.alias[0]"> ({{ item.alias[0] }}) </span>
              </template>
              <template #bottom>
                <span>{{ item.artist.anme }}</span>
                <span>{{ parseDate(item.publishTime) }}</span>
              </template>
            </ListItem>
          </div>

          <div class="artist" v-if="item.title === '用户'">
            <ListItem
              v-for="(item, index) in item.users"
              @click="handleClickItem(item)"
            >
              <template #left>
                <img class="users-cover" :src="item.avatarUrl" alt="" />
              </template>
              <template #top>
                <span>{{ item.nickname }}</span>
              </template>
              <template #bottom>
                <span>{{ item.signature }}</span>
              </template>
              <template #right>
                <button class="right solo-play-btn" @click="handleAddUser">
                  <icon :icon="['fas', 'plus']" size="sm" />
                  关注
                </button>
              </template>
            </ListItem>
          </div>
        </template>

        <template #footer>
          <span>{{ item.moreText }}</span>

          <icon
            @click="$emit('change-screen')"
            class="down-icon"
            :icon="['fas', 'chevron-right']"
            size="sm"
          />
        </template>
      </ListCard>
    </div>
  </div>
</template>
<script lang="ts">
import ListCard from "@/components/content/musicList/ListCard.vue";
import ListItem from "@/components/content/musicList/ListItem.vue";

import { defineComponent, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

import { getSearchComplex } from "@/network/search";
import { showSinger, parseDate } from "@/common/utils/show";
export default defineComponent({
  name: "DetailComplex",
  components: {
    ListCard,
    ListItem
  },
  props: {
    test: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup() {
    const $route = useRoute();
    let complex = reactive({
      song: {},
      playList: {},
      artist: {},
      album: {},
      user: {}
    });

    const handleClickItem = (item: any) => {
      console.log(item);
    };
    const handleVideo = (item: any) => {
      console.log(item);
    };
    const handleSetting = (item: any) => {
      console.log(item);
    };
    const handleAddUser = (item: any) => {
      console.log(item);
    };

    onMounted(async () => {
      const key = $route.params.key;

      const { song, playList, artist, album, user } = await getSearchComplex(
        key as string
      );
      song.title = "单曲";
      playList.title = "歌单";
      artist.title = "艺人";
      album.title = "专辑";
      user.title = "用户";

      complex.song = song;
      complex.playList = playList;
      complex.artist = artist;
      complex.album = album;
      complex.user = user;
      console.log(complex);
    });
    return {
      complex,
      showSinger,
      parseDate,
      handleClickItem,
      handleVideo,
      handleSetting,
      handleAddUser
    };
  }
});
</script>
<style scoped>
.complex-body {
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow: hidden;
  border-radius: 5%;
}
.complex-body > div {
  padding: 10px 0;
  margin: 10px 0;
  border-radius: 5%;
  background-color: var(--color-highlight-background);
}
.solo-play-btn {
  font-size: 13px;
  line-height: 22px;
  height: 22px;
  width: 60px;

  border-radius: 10px;
  border: solid 1px #bbb;
  background-color: var(--color-background);
  outline: none;
}
.playlist-cover {
  width: 100%;
  border-radius: 5px;
}
.artist-cover,
.users-cover {
  width: 100%;
  border-radius: 50%;
}
</style>
