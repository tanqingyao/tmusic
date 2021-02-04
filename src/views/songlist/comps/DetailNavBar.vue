<template>
  <NavBar class="nav-bar">
    <template #left>
      <icon
        @click="$router.back"
        class="icon"
        :icon="['fas', 'chevron-left']"
        :style="{ color: '#fff' }"
      />
    </template>
    <template #center>
      <div class="title">{{ title }}</div>
    </template>
    <template #right>
      <icon
        @click="handleSearch"
        class="icon"
        :icon="['fas', 'search']"
        size="lg"
        :style="{ color: '#fff' }"
      />
      <icon
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
    const handleSearch = () => {
      console.log("handleBack");
    };
    const handleSetting = () => {
      console.log("handleBack");
    };
    return {
      handleSearch,
      handleSetting
    };
  }
};
</script>
<style scoped>
.nav-bar {
  background-color: var(--color-background-shadow);
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
