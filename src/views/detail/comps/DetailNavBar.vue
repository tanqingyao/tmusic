<template>
  <NavBar class="nav-bar">
    <template #left>
      <font-awesome-icon
        @click="handleBack"
        class="icon"
        :icon="['fas', 'chevron-left']"
        :style="{ color: '#fff' }"
      />
    </template>
    <template #center>
      <div class="title">{{ title }}</div>
    </template>
    <template #right>
      <font-awesome-icon
        @click="handleSearch"
        class="icon"
        :icon="['fas', 'search']"
        size="lg"
        :style="{ color: '#fff' }"
      />
      <font-awesome-icon
        @click="handleSetting"
        class="icon"
        :icon="['fas', 'ellipsis-v']"
        size="lg"
        :style="{ color: '#fff' }"
      />
    </template>
  </NavBar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import { useRouter } from "vue-router";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  setup() {
    const $router = useRouter();
    const handleBack = () => {
      $router.back();
    };
    const handleSearch = () => {
      console.log("handleBack");
    };
    const handleSetting = () => {
      console.log("handleBack");
    };
    return {
      handleBack,
      handleSearch,
      handleSetting
    };
  }
};
</script>
<style scoped>
.nav-bar {
  background-color: var(--color-background-d);
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
  color: var(--color-text-ll);
}
</style>
