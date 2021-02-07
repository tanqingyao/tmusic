<template>
  <Card v-for="(data, key, index) in complex">
    <template #header>
      <span class="left">{{ titles[index] }} </span>
      <button
        class="right list-item-btn"
        @click="handlePlayAll"
        v-if="data.type === type.SONGS"
      >
        <icon :icon="['fas', 'play']" size="sm" />
        播放
      </button>
    </template>

    <template #content>
      <ListItem v-for="(item, index) in data.list" @click="handlePlay(item)">
        <template #left>
          <img
            v-if="data.type !== type.SONGS && item.imgUrl"
            :class="{
              'list-item-cover-round':
                data.type === type.USERS || data.type === type.ARTISTS,
              'list-item-cover-square':
                data.type === type.ALBUMS || data.type === type.PLAYLISTS
            }"
            v-lazy="item.imgUrl"
            alt=""
          />
          <span v-if="data.type === type.SONGS">{{ index + 1 }}</span>
        </template>
        <template #center>
          <ListItemCenter>
            <template #center-item>
              <span class="list-item-title">{{ item.name }}</span>
            </template>
          </ListItemCenter>

          <ListItemCenter>
            <template #center-item>
              <span class="list-item-desc">{{ item.desc }}</span>
            </template>
          </ListItemCenter>
        </template>

        <template #right>
          <div class="list-item-icon" v-if="data.type === type.SONGS">
            <icon
              v-if="item.mv"
              :icon="['fas', 'video']"
              :style="{ color: '#999' }"
              @click="handleVideo"
            />
          </div>
          <div class="list-item-icon" v-if="data.type === type.SONGS">
            <icon
              :icon="['fas', 'ellipsis-v']"
              :style="{ color: '#999' }"
              @click="handleSetting"
            />
          </div>

          <div class="list-item-icon" v-if="data.type === type.ARTISTS">
            <icon
              :icon="['fas', 'user']"
              :style="{ color: '#999' }"
              @click="handleSetting"
            />
            已入驻
          </div>

          <div class="list-item-icon" v-if="data.type === type.USERS">
            <button class="right list-item-btn" @click="handleAddUser">
              <icon :icon="['fas', 'plus']" size="sm" />
              关注
            </button>
          </div>
        </template>
      </ListItem>
    </template>

    <template #footer>
      <span>{{ moreText[index] }}</span>

      <icon class="down-icon" :icon="['fas', 'chevron-right']" size="sm" />
    </template>
  </Card>
  <Card>
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
  </Card>
</template>
<script lang="ts">
import { SearchType } from "@/common/constant";
import {
  Card,
  ListItem,
  ListItemCenter
} from "@/components/content/customList";

import { defineComponent, onMounted, reactive, Ref, ref } from "vue";
import { useRoute } from "vue-router";

import { getSearchComplex } from "@/network/search";
export default defineComponent({
  name: "DetailComplex",
  components: {
    Card,
    ListItem,
    ListItemCenter
  },
  props: {
    titles: {
      type: Array,
      default: []
    }
  },
  setup() {
    const $route = useRoute();

    // 选择展示列表类型
    let option = reactive({
      showTab: false,
      showIndex: false
    });

    // 展示数据
    const simiQuery = ref([]);
    const moreText = ref([]);
    const complex = reactive({
      [SearchType.SONGS]: { list: [], type: SearchType.SONGS },
      [SearchType.PLAYLISTS]: { list: [], type: SearchType.PLAYLISTS },
      [SearchType.ARTISTS]: { list: [], type: SearchType.ARTISTS },
      [SearchType.ALBUMS]: { list: [], type: SearchType.ALBUMS },
      [SearchType.USERS]: { list: [], type: SearchType.USERS }
    });
    /* 搜索类型映射 */
    const type = {
      SONGS: SearchType.SONGS,
      PLAYLISTS: SearchType.PLAYLISTS,
      ARTISTS: SearchType.ARTISTS,
      ALBUMS: SearchType.ALBUMS,
      USERS: SearchType.USERS
    };

    // 操作回调
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

    const handlePlayAll = () => {
      console.log("handlePlayAll");
    };
    const handlePlay = (item: ISong) => {
      // $store.dispatch(ActionTypes.AddPlayList, [item.id]);
    };
    onMounted(async () => {
      // 获取展示数据
      const key = $route.params.key;
      const res = await getSearchComplex(key as string);

      simiQuery.value = res.simiQuery;

      moreText.value = res.moreTextArr;

      complex[SearchType.SONGS].list = res.items[SearchType.SONGS];
      complex[SearchType.PLAYLISTS].list = res.items[SearchType.PLAYLISTS];

      // 判断artist是否显示别名
      complex[SearchType.ARTISTS].list = res.items[SearchType.ARTISTS].map(
        (a: IArtist) => {
          if (a.alias) {
            a.name = `${a.name}${a.alias[0] ? "（" + a.alias[0] + "）" : ""}`;
          }
          return a;
        }
      );

      complex[SearchType.ALBUMS].list = res.items[SearchType.ALBUMS];
      complex[SearchType.USERS].list = res.items[SearchType.USERS];
    });
    return {
      scroll,
      simiQuery,
      moreText,
      complex,
      type,
      option,
      handlePlayAll,
      handlePlay,
      handleClickItem,
      handleVideo,
      handleSetting,
      handleAddUser
    };
  }
});
</script>
<style scoped>
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

/* musicList */

.list-tab {
  margin: 20px 0;
}
.list-tab-left {
  text-align: left;

  font-size: var(--font-size-large);
  color: var(--color-text);
}
.list-tab-right {
  text-align: right;
  margin-right: 10px;
}
.list-tab-icon {
  margin: 0 12px;
}
/* 歌曲列表 */

.list-item-cover-round {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.list-item-cover-square {
  width: 40px;
  height: 40px;
  border-radius: 5px;
}

.list-item-title {
  font-size: var(--font-size-medium-x);
  color: var(--color-high-text);
}
.list-item-desc {
  font-size: var(--font-size-small);
  color: var(--color-text);
}
/* icon */
.list-item-icon {
  flex: 1;
  text-align: center;
}

.list-item-btn {
  font-size: 13px;
  line-height: 22px;
  height: 22px;
  width: 60px;

  border-radius: 10px;
  border: solid 1px #bbb;
  background-color: var(--color-background);
  outline: none;
}

/* musicList */
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
