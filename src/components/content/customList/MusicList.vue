<template>
  <ListTab class="list-tab" v-if="showTab">
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
          v-if="showDownld"
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
  <ListItem v-for="(item, index) in songs" @click="handlePlay(item)">
    <template #left>
      <img
        v-if="showImg && item.imgUrl"
        class="list-item-cover"
        :src="item.imgUrl"
        alt=""
      />
      <span v-if="showIndex">{{ index + 1 }}</span>
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
      <div class="list-item-icon">
        <icon
          v-if="listType === '单曲' && item.mv"
          class="icon"
          :icon="['fas', 'video']"
          :style="{ color: '#999' }"
          @click="handleVideo"
        />
      </div>

      <div class="list-item-icon">
        <icon
          v-if="listType === '单曲'"
          class="icon"
          :icon="['fas', 'ellipsis-v']"
          :style="{ color: '#999' }"
          @click="handleSetting"
        />
      </div>
      <div class="list-item-icon" v-if="listType === '用户'">
        <button class="right list-item-btn" @click="handleAddUser">
          <icon :icon="['fas', 'plus']" size="sm" />
          关注
        </button>
      </div>
    </template>
  </ListItem>
</template>
<script lang="ts">
import {
  ListTab,
  ListItem,
  ListItemCenter
} from "@/components/content/customList";
import { defineComponent, onMounted, PropType } from "vue";
export default defineComponent({
  name: "MusicList",
  components: {
    ListTab,
    ListItem,
    ListItemCenter
  },
  props: {
    songs: {
      type: Array as PropType<Array<{}>>,
      default() {
        return [];
      }
    },
    showTab: {
      type: Boolean as PropType<Boolean>,
      default: true
    },
    showDownld: {
      type: Boolean as PropType<Boolean>,
      default: true
    },
    showIndex: {
      type: Boolean as PropType<Boolean>,
      default: true
    },
    showImg: {
      type: Boolean as PropType<Boolean>,
      default: true
    },
    listType: {
      type: String as PropType<String>,
      default: ""
    }
  },
  setup(props) {
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
    return {
      handlePlayAll,
      handleDownLoad,
      handleCheckAll,
      handleVideo,
      handleSetting,
      handlePlay
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

.list-item-cover {
  width: 40px;
  height: 40px;
  border-radius: 50%;
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
