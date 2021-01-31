<template>
  <div class="detail">
    <DetailNavBar title="歌单" />
    <Scroll ref="scroll" class="wrapper">
      <DetailHead>
        <template #above>
          <DescItem class="detail-item">
            <template #img>
              <Cover :item="info" :showTitle="false" />
            </template>
            <template #top>
              <span class="detail-title">{{ info.title }}</span>
            </template>
            <template #mid>
              <div class="detail-creator">
                <img :src="info.avatar" alt="" />
                {{ info.name }}
                <button @click="handleAddUser">
                  <icon :icon="['fas', 'plus']" :style="{ color: '#eee' }" />
                </button>
              </div>
            </template>
            <template #bottom>
              <span class="detail-desc">
                {{ info.desc }}
              </span>
              <icon :icon="['fas', 'chevron-right']" />
            </template>
          </DescItem>
        </template>

        <template #below>
          <div class="detail-static">
            <button @click="handleSubs">
              <icon :icon="['fas', 'folder-plus']" />
              {{ changeUnit(info.subscribedCount) }}
            </button>
            <button @click="handleComment">
              <icon :icon="['fas', 'comment-dots']" />
              {{ changeUnit(info.commentCount) }}
            </button>
            <button @click="handleShare">
              <icon :icon="['fas', 'share-alt']" />
              {{ changeUnit(info.shareCount) }}
            </button>
          </div>
        </template>
      </DetailHead>
      <DetailContent>
        <template #content>
          <ListTab class="list-tab">
            <template #left>
              <div class="list-tab-left">
                <icon
                  class="list-tab-icon"
                  size="lg"
                  :icon="['fas', 'play-circle']"
                  :style="{ color: '#f00' }"
                  @click="handlePlayAll"
                />
                <span>播放全部</span>
                <span>({{ info.trackCount }})</span>
              </div>
            </template>
            <template #right>
              <div class="list-tab-right">
                <icon
                  class="list-tab-icon"
                  size="lg"
                  :icon="['fas', 'arrow-alt-circle-down']"
                  :style="{ color: '#000' }"
                />
                <icon
                  class="list-tab-icon"
                  size="lg"
                  :icon="['fas', 'check-circle']"
                  :style="{ color: '#000' }"
                  @click="handleCheckAll"
                />
              </div>
            </template>
          </ListTab>
          <MusicListItem
            v-for="(item, index) in songs"
            @click="handlePlay(item)"
          >
            <template #left>
              <span>{{ index + 1 }}</span>
            </template>
            <template #top>
              {{ item.name }}
            </template>
            <template #bottom-left>
              <span v-for="(ar, index) in item.artists">
                <span v-if="index !== item.artists.length - 1">
                  {{ ar }} /
                </span>
                <span v-else>{{ ar }} - </span>
              </span>
            </template>
            <template #bottom-right>
              {{ item.album }}
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
          </MusicListItem>
        </template>
      </DetailContent>
    </Scroll>
  </div>
</template>
<script lang="ts">
import DetailNavBar from "./comps/DetailNavBar.vue";
import DetailHead from "./comps/DetailHead.vue";
import DetailContent from "./comps/DetailContent.vue";

import Scroll from "components/common/scroll/Scroll.vue";

import Cover from "components/content/cover/Cover.vue";
import DescItem from "components/content/descItem/DescItem.vue";
import ListTab from "components/content/musicList/ListTab.vue";
import MusicListItem from "components/content/musicList/MusicListItem.vue";

import { getSonglistDetail, getSongsDetail } from "@/network/detail/index";
import { changeUnit } from "@/common/utils/show";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ActionTypes } from "@/store/types";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailHead,
    Cover,
    DetailContent,
    DescItem,
    ListTab,
    MusicListItem,
    Scroll
  },
  setup() {
    /* 数据加载相关 */
    const info = ref({});
    const songs = ref({});
    const $route = useRoute();
    const $store = useStore();
    onMounted(async () => {
      info.value = await getSonglistDetail($route.params.id);
      // console.log(info.value);
      songs.value = await getSongsDetail(
        (info.value as { songIds: number[] }).songIds
      );
    });

    /* 点击相关 */
    const handleAddUser = () => {
      console.log("handleAddUser");
    };
    const handleSubs = () => {
      console.log("handleSubs");
    };
    const handleComment = () => {
      console.log("handleComment");
    };
    const handleShare = () => {
      console.log("handleShare");
    };

    const handlePlayAll = () => {
      console.log("handlePlayAll");
    };
    const handleDownLoad = () => {
      console.log("handleDownLoad");
    };
    const handleCheckAll = () => {
      console.log("handleCheckAll");
    };

    const handleVideo = () => {
      console.log("handleVideo");
    };
    const handleSetting = () => {
      console.log("handleSetting");
    };
    const handlePlay = (item: ISong) => {
      $store.dispatch(ActionTypes.AddPlayList, [item.id]);
    };

    return {
      info,
      songs,
      changeUnit,

      handleAddUser,
      handleSubs,
      handleComment,
      handleShare,
      handlePlayAll,
      handleDownLoad,
      handleCheckAll,
      handleVideo,
      handleSetting,
      handlePlay
    };
  }
};
</script>
<style scoped>
.detail {
  height: 100vh;
  position: relative;
}
.wrapper {
  height: calc(100% - 44px - 60px);

  overflow: hidden;
  position: relative;
}
.detail-item {
  padding-bottom: 30px;
  background-color: var(--color-background-d);
}
.detail-title {
  color: #fff;
}
.detail-creator {
  margin-top: 10px;
}
.detail-creator img {
  width: 20px;
  border-radius: 10px;
  vertical-align: middle;
  margin-right: 3px;
}

.detail-creator button {
  font-size: 14px;
  height: 18px;
  width: 30px;
  margin-left: 3px;
  border-radius: 15px;
  border: solid 1px #bbb;
  background-color: #bbb;
  outline: none;
}
.detail-creator,
.detail-desc {
  font-size: 12px;
  color: var(--color-text);
}

.detail-static {
  height: 40px;
  width: 70%;
  margin: 0 auto;
  border-radius: 30px;
  border: solid 1px #fff;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  position: relative;
  top: -20px;
  display: flex;
  justify-content: center;
}
.detail-static button {
  background-color: rgba(0, 0, 0, 0);
  flex: 1;
  border: none;
  outline: none;
}

.list-tab {
  margin-bottom: 25px;
}
.list-tab-left {
  text-align: left;

  font-size: var(--font-size-large);
  color: var(--color-text);
}
.list-tab-right {
  text-align: right;
}
.list-tab-icon {
  margin: 0 10px;
}
</style>
