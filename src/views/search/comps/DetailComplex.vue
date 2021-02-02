<template>
  <Scroll ref="scroll" class="complex-body">
    <div v-for="(item, key, index) in complex">
      <ListCard>
        <template #header>
          <span class="left">{{ titles[index] }}</span>
          <button
            class="right solo-play-btn"
            @click="handlePlayAll"
            v-if="key === 'songs'"
          >
            <icon :icon="['fas', 'play']" size="sm" />
            播放
          </button>
        </template>

        <template #content>
          <ListItem
            v-for="(item, index) in item"
            @click="handleClickItem(item)"
          >
            <template #left>
              <img
                v-if="item.imgUrl"
                class="artist-cover"
                :src="item.imgUrl"
                alt=""
              />
            </template>

            <template #center>
              <ListItemCenter>
                <template #center-item>
                  <span>{{ item.name }}</span>
                </template>
              </ListItemCenter>
              <ListItemCenter>
                <template #center-item>
                  <span>{{ item.desc }}</span>
                </template>
              </ListItemCenter>
            </template>

            <template #right>
              <icon
                v-if="key === 'songs'"
                class="icon"
                :icon="['fas', 'video']"
                :style="{ color: '#999' }"
                @click="handleVideo"
              />
              <icon
                v-if="key === 'songs'"
                class="icon"
                :icon="['fas', 'ellipsis-v']"
                :style="{ color: '#999' }"
                @click="handleSetting"
              />
              <button
                v-if="key === 'users'"
                class="right solo-play-btn"
                @click="handleAddUser"
              >
                <icon :icon="['fas', 'plus']" size="sm" />
                关注
              </button>
            </template>
          </ListItem>
        </template>

        <template #footer>
          <span>{{ moreText[index] }}</span>

          <icon class="down-icon" :icon="['fas', 'chevron-right']" size="sm" />
        </template>
      </ListCard>
    </div>
    <div>
      <ListCard>
        <template #header>
          <span class="left">相关搜索</span>
        </template>
        <template #content>
          <div class="simi-query">
            <div class="simi-item" v-for="item in simiQuery">
              {{ item.keyword }}
            </div>
          </div>
        </template>
      </ListCard>
    </div>
  </Scroll>
</template>
<script lang="ts">
import {
  ListCard,
  ListItem,
  ListItemCenter
} from "@/components/content/customList";
import Scroll from "@/components/common/scroll/Scroll.vue";

import {
  defineComponent,
  onMounted,
  reactive,
  ReactiveEffect,
  Ref,
  ref
} from "vue";
import { useRoute } from "vue-router";

import { getSearchComplex } from "@/network/search";
export default defineComponent({
  name: "DetailComplex",
  components: {
    ListCard,
    ListItem,
    ListItemCenter,
    Scroll
  },
  props: {
    titles: {
      type: Array,
      default() {
        return ["单曲", "歌单", "艺人", "专辑", "用户"];
      }
    }
  },
  setup() {
    const $route = useRoute();

    const scroll: Ref = ref(null);

    let simiQuery = ref([]);
    let moreText = ref([]);
    let complex = reactive({
      songs: {},
      playLists: {},
      artists: {},
      albums: {},
      users: {}
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
      setTimeout(() => {
        scroll.value.refresh();
      }, 500);

      const key = $route.params.key;
      const res = await getSearchComplex(key as string);

      simiQuery.value = res.simiQuery;

      moreText.value = res.moreTextArr;

      complex.songs = res.items.songs;
      complex.playLists = res.items.playLists;
      complex.artists = res.items.artists;
      complex.albums = res.items.albums;
      complex.users = res.items.users;
    });
    return {
      scroll,

      simiQuery,
      moreText,
      complex,

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
  height: calc(100vh - 44px - 40px - 60px);
  width: 100vw;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.simi-query {
  /* display: flex; */
}
.simi-item {
  /* flex: 1 0; */
  display: inline-block;
  color: var(--color-high-text);
  background-color: var(--color-background-shadow);
  border-radius: 20px;
  margin: 5px;
  padding: 5px 10px;
}
</style>
