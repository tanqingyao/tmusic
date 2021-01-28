<template>
  <NavBar>
    <template #center>
      <TabControl
        :titles="['推荐', '歌手', '排行']"
        :path="['/recommend', '/singer', '/rank']"
      />
    </template>
    <template #right>
      <icon
        @click="settingClick"
        class="navbar-right"
        :icon="['fas', 'user']"
        size="sm"
      />
    </template>
  </NavBar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
export default {
  name: "MainNavBar",
  components: {
    NavBar,
    TabControl
  },
  methods: {
    settingClick() {
      if (this.$route.path !== "/profile") {
        this.$router.push("/profile");
      }
    }
  }
};
</script>
<style scoped>
.navbar-right {
  margin: 0 10px;
  width: 30px;
}
</style>
