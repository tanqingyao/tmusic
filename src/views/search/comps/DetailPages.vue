<template>
  <Scroll ref="scroll" class="scroll-content" :requestData="requestData">
    <ListTab class="list-tab" v-if="type === songType">
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
        </div>
      </template>
      <template #right>
        <div class="list-tab-right">
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
      v-for="(item, index) in list"
      :key="item.id"
      @click="handlePlay(item)"
    >
      <template #left>
        <img
          v-if="item.imgUrl"
          :class="{
            'list-item-cover-round': type === userType || type === artistType,
            'list-item-cover-square': type !== userType && type !== artistType
          }"
          v-lazy="item.imgUrl"
          alt=""
        />
        <span v-if="type === songType">{{ index + 1 }}</span>
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
        <div class="list-item-icon" v-if="type === songType">
          <icon
            v-if="item.mv"
            :icon="['fas', 'video']"
            :style="{ color: '#999' }"
            @click="handleVideo"
          />
        </div>
        <div class="list-item-icon" v-if="type === songType">
          <icon
            :icon="['fas', 'ellipsis-v']"
            :style="{ color: '#999' }"
            @click="handleSetting"
          />
        </div>

        <div class="list-item-icon" v-if="type === artistType">
          <icon
            :icon="['fas', 'user']"
            :style="{ color: '#999' }"
            @click="handleSetting"
          />
          已入驻
        </div>

        <div class="list-item-icon" v-if="type === userType">
          <button class="right list-item-btn" @click="handleAddUser">
            <icon :icon="['fas', 'plus']" size="sm" />
            关注
          </button>
        </div>
      </template>
    </ListItem>
  </Scroll>
</template>
<script lang="ts">
import Scroll from "@/components/common/scroll/Scroll.vue";
import {
  ListTab,
  ListItem,
  ListItemCenter
} from "@/components/content/customList";

import { SearchType } from "@/common/constant";
import {
  defineComponent,
  PropType,
  Ref,
  toRefs,
  onActivated,
  onDeactivated,
  ref
} from "vue";
/* 数据接口 */
import { StoreConfig, complex } from "./SearchResult.vue";
export default defineComponent({
  name: "DetailPages",
  components: {
    Scroll,
    ListTab,
    ListItem,
    ListItemCenter
  },
  props: {
    displayData: {
      type: Object as PropType<StoreConfig<complex>>,
      default: {}
    },
    requestData: {
      type: Function,
      default: () => {}
    }
  },
  setup(props) {
    /* 数据展示相关 */
    const type = props.displayData.type;
    // 展示的数据类型映射
    const typeMap = {
      songType: SearchType.SONGS,
      playlistType: SearchType.PLAYLISTS,
      artistType: SearchType.ARTISTS,
      albumType: SearchType.ALBUMS,
      userType: SearchType.USERS
    };

    /* 回调相关 */
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
      // $store.dispatch(ActionTypes.AddPlayList, [item.id]);
    };
    const handleAddUser = () => {
      console.log(`handleAddUser:`);
    };

    /* 滚动状态记录相关 */
    const scroll: Ref = ref(null);
    let leavePos: SearchType[] = [];
    onActivated(() => {
      // 进入上次停留位置
      if (leavePos[type]) {
        scroll.value.scrollTo(0, leavePos[type], 0);
      } else {
        scroll.value.scrollTo(0, 0, 0);
      }
    });
    onDeactivated(() => {
      // 离开时记录滚动位置
      leavePos[type] = scroll.value.getScrollY();
    });
    return {
      scroll,
      ...typeMap,
      ...toRefs(props.displayData),
      handlePlayAll,
      handleDownLoad,
      handleCheckAll,
      handleVideo,
      handleSetting,
      handlePlay,
      handleAddUser
    };
  }
});
</script>
<style scoped>
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
</style>
