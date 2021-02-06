<template>
  <NavBar class="nav-bar">
    <template #left>
      <icon
        @click="$router.back"
        class="icon"
        :icon="['fas', 'chevron-left']"
        :style="{ color: '#000' }"
      />
    </template>
    <template #center>
      <div class="title">{{ title }}</div>
    </template>
  </NavBar>
</template>
<script lang="ts">
import NavBar from "components/common/navbar/NavBar.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "BackNavBar",
  components: {
    NavBar
  },
  props: {
    title: {
      type: String,
      default: "title"
    }
  },
  setup() {
    return {};
  }
});
</script>
<style scoped>
.nav-bar {
  background-color: var(--color-background);
}
.icon {
  vertical-align: middle;
  width: 50px;
  height: 22px;
}
.title {
  line-height: 44px;
  font-size: 18px;
  text-align: left;
  color: var(--color-high-text);
}
</style>
