<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in titles"
      @click="itemClick(index)"
      :class="{ active: $route.path === path[index] }"
    >
      <span> {{ item }} </span>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
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
  setup(props) {
    const { path } = toRefs(props);
    const $router = useRouter();
    const $route = useRoute();
    const itemClick = index => {
      if ($route.path !== path.value[index]) {
        $router.push(path.value[index]);
      }
    };
    return {
      itemClick
    };
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
  border-bottom: 3px solid var(--color-theme);
}
</style>
