<template>
  <BackNavBar title="云音乐歌手榜" />
  <TabControl
    ref="tabcontrol"
    :titles="['华语', '欧美', '韩国', '日本']"
    @tab-click="handleTabClick"
  />

  <Scroll ref="scroll" class="scroll-content">
    <ListTab class="list-tab">
      <template #left>
        <div class="list-tab-left">
          <span
            >更新时间：{{ parseDate(singers[currentType].updateTime) }}

            <icon
              class="list-tab-icon"
              :icon="['fas', 'exclamation-circle']"
              :style="{ color: '#aaa' }"
            />
          </span>
        </div>
      </template>
    </ListTab>
    <div class="list-content">
      <div
        class="list-item"
        v-for="(item, index) in singers[currentType].list"
        :key="item.id"
        @click="handleSingerDetail(item)"
      >
        <span class="list-item-index">{{ index + 1 }}</span>

        <img class="list-item-cover" v-lazy="item.picUrl" alt="歌手头像" />

        <div class="item-center">
          <ListItemCenter>
            <template #center-item>
              <span class="list-item-title">{{ item.name }}</span>
            </template>
          </ListItemCenter>
          <ListItemCenter>
            <template #center-item>
              <icon
                class="list-tab-icon"
                size="sm"
                :icon="['fas', 'fire-alt']"
                :style="{ color: '#aaa' }"
              />
              <span class="list-item-score">{{ item.score }}</span>
            </template>
          </ListItemCenter>
        </div>
      </div>
    </div>
  </Scroll>
</template>
<script lang="ts">
import BackNavBar from "@/components/content/customNavBar/BackNavBar.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import {
  ListTab,
  ListItem,
  ListItemCenter
} from "@/components/content/customList";

import { onMounted, reactive, ref, Ref } from "vue";
import { SingersRankType } from "@/common/constant";
import { defineComponent } from "vue";

import { getRankSingers } from "@/network/rank";
import { parseDate } from "@/common/utils/show";
export default defineComponent({
  name: "SingerLists",
  components: {
    BackNavBar,
    TabControl,

    Scroll,
    ListTab,
    ListItem,
    ListItemCenter
  },
  setup() {
    const currentType: Ref<SingersRankType> = ref(1);
    const singers = reactive({
      [SingersRankType.CN]: {
        list: [],
        updateTime: 0
      },
      [SingersRankType.EA]: {
        list: [],
        updateTime: 0
      },
      [SingersRankType.KR]: {
        list: [],
        updateTime: 0
      },
      [SingersRankType.JP]: {
        list: [],
        updateTime: 0
      }
    });
    const fetchSingerRankData = async (type: SingersRankType) => {
      const res = await getRankSingers(type);
      singers[type].list = res.singers;
      singers[type].updateTime = res.updateTime;

      console.log(singers[type]);
    };
    const handleTabClick = async (index: number) => {
      currentType.value = index + 1;
      await fetchSingerRankData(currentType.value);
    };
    const handleSingerDetail = () => {
      console.log("handleSingerDetail");
    };
    onMounted(async () => {
      await fetchSingerRankData(currentType.value);
    });
    return {
      handleTabClick,
      handleSingerDetail,
      singers,
      currentType,
      parseDate
    };
  }
});
</script>
<style scoped>
.scroll-content {
  height: 100vh;
  overflow: hidden;
  background-color: var(--color-background);
}

.list-tab {
  margin: 20px 0;
}

.list-item {
  flex: 1;
  width: 100%;
  height: 70px;
  line-height: 70px;
  margin: 10px 0;
  display: flex;
}
/* 索引 */
.list-item-index {
  flex: 1;
  text-align: center;
  font-size: var(--font-size-large-x);
  font-weight: 1000;
}
.list-item:nth-child(-n + 3) .list-item-index {
  color: #f00;
}

/* 图片 */
.list-item-cover {
  flex: 2;
  text-align: center;
  height: 70px;
  width: 70px;
  object-fit: cover;
  border-radius: 5px;
}
/* 中间 */
.item-center {
  margin: 0 10px;
  flex: 7;
  font-size: var(--font-size-medium);
  color: var(--color-text);
  display: flex;
  flex-direction: column;
}
.list-item-title {
  font-size: var(--font-size-medium-x);
  font-weight: 500;
  color: #000;
}
.list-item-score {
  color: #aaa;
  font-size: var(--font-size-small-s);
}
.list-tab-icon {
  margin-right: 5px;
}
</style>
