<template>
  <NavBar>
    <template #center>
      <div>Music Player</div>
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
export default {
  name: "MainNavBar",
  components: {
    NavBar
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
