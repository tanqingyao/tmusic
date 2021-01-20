<template>
  <NavBar>
    <template #center>
      <TabControl
        :titles="['推荐', '歌手', '排行', '搜索']"
        :path="['/recommend', '/singer', '/rank', 'search']"
      />
    </template>
    <template #right>
      <div @click="settingClick" class="navbar-right">
        <img src="~assets/img/common/settings.svg" alt="setting image" />
      </div>
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
  margin-top: 5px;
  margin-left: 15px;
  width: 30px;
}
</style>
