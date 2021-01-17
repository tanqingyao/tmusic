<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in titles"
      @click="itemClick(index)"
      :class="{ active: index === currentIndex }"
    >
      <span> {{ item }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    },
    path: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // this.$emit("tabClick", index);
      if (this.$route.path !== this.path[index]) {
        this.$router.push(this.path[index]);
      }
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: var(--color-background);
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px;
}

.active {
  color: var(--color-theme);
}

/* 活跃状态下的小横条 */
.active span {
  border-bottom: 3px solid var(--color-theme-d);
}
</style>
