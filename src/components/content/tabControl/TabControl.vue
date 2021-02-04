<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in titles"
      @click="handleClick(index)"
      :class="{ active: index === currentIndex }"
    >
      <span> {{ item }} </span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  emits: {
    "tab-click": null
  },
  setup(props, { emit }) {
    let currentIndex = ref(0);
    const handleClick = index => {
      currentIndex.value = index;
      emit("tab-click", index);
    };
    return {
      currentIndex,
      handleClick
    };
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 13px;
  height: 40px;
  line-height: 40px;
  background-color: var(--color-background);
  /* overflow: hidden; */
  flex-wrap: nowrap;
}

.tab-control-item {
  flex: 1;
  min-width: 70px;
}

.tab-control-item span {
  padding: 0px;
}

.active {
  font-weight: 700;
  color: var(--color-theme-d);
}

/* 活跃状态下的小横条 */
.active span {
  border-bottom: 4px solid var(--color-theme);
}
</style>
