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
              <span class="detail-title">{{ info.name }}</span>
            </template>
            <template #mid>
              <div class="detail-creator">
                <img v-lazy="info.creatorUrl" alt="" />
                {{ info.creatorname }}
                <button @click="handleAddUser">
                  <icon :icon="['fas', 'plus']" :style="{ color: '#eee' }" />
                </button>
              </div>
            </template>
            <template #bottom>
              <span class="detail-desc">
                {{ info.description }}
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
          <ListItem
            v-for="(item, index) in songsinfo"
            @click="handlePlay(item)"
          >
            <template #left>
              <span>{{ index + 1 }}</span>
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
        </template>
      </DetailContent>
    </Scroll>
  </div>
</template>
<script lang="ts">
import DetailNavBar from "./DetailNavBar.vue";
import DetailHead from "./DetailHead.vue";
import DetailContent from "./DetailContent.vue";

import Scroll from "components/common/scroll/Scroll.vue";

import Cover from "components/content/cover/Cover.vue";
import DescItem from "components/content/descItem/DescItem.vue";

import {
  ListTab,
  ListItem,
  ListItemCenter
} from "@/components/content/customList";

import { getSongsDetail } from "@/network/song";
import { getSonglistDetail } from "@/network/songlist";
import { changeUnit } from "@/common/utils/show";
import { ref, onMounted, Ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ActionTypes } from "@/store/types";
export default {
  name: "SonglistDetail",
  components: {
    DetailNavBar,
    DetailHead,
    Cover,
    DetailContent,
    DescItem,
    ListItemCenter,
    ListTab,
    ListItem,
    Scroll
  },
  setup() {
    /* 数据加载相关 */
    const info: Ref = ref({});
    const songsinfo: Ref = ref({});
    const $route = useRoute();
    const $store = useStore();
    onMounted(async () => {
      const id = parseInt($route.params.id as string);
      info.value = await getSonglistDetail(id);
      songsinfo.value = await getSongsDetail(info.value.songIds);
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
      $store.dispatch(ActionTypes.AddSongsToPlayList, songsinfo.value);
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
    const handlePlay = (item: SongInfo) => {
      $store.dispatch(ActionTypes.AddSongsToPlayList, [item]);
    };

    return {
      info,
      songsinfo,
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
  background-color: var(--color-background-shadow);
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
/* 歌曲列表 */
.list-item-title {
  font-size: var(--font-size-medium-x);
  color: var(--color-high-text);
}
.list-item-desc {
  font-size: var(--font-size-small);
  color: var(--color-text);
}
</style>
