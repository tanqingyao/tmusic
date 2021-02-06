<template>
  <NavBar class="nav-bar">
    <template #left>
      <icon
        class="back-icon"
        @click="$router.back"
        :icon="['fas', 'arrow-left']"
        size="lg"
      />
    </template>
    <template #center>
      <div class="text">{{ title }}</div>
    </template>
  </NavBar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "ProfileNavBar",
  components: {
    NavBar
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>
<style scoped>
.nav-bar {
  color: var(--color-text);
  font-size: var(--font-size-small-s);
}
.back-icon {
  width: 30px;
}
</style>
