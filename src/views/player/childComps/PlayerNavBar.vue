<template>
  <NavBar class="player-nav-bar">
    <template #left>
      <img
        @click="backIconClick"
        class="down-icon"
        src="~assets/img/common/down_chevron_4.svg"
        alt="向下关闭"
      />
    </template>
    <template #center>
      <div class="text">
        <span>{{ song.name }}</span>
        <span>{{ song.singer }}</span>
      </div>
    </template>
  </NavBar>
</template>
<script>
const NavBar = () => import("components/common/navbar/NavBar");

export default {
  name: "PlayerNavBar",
  components: {
    NavBar
  },
  props: {
    song: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    backIconClick() {
      this.$emit("changeScreen");
    }
  }
};
</script>
<style scoped>
.player-nav-bar {
  background-color: #666;
  height: 55px;
}
.down-icon {
  background-color: #666;

  margin-top: 7px;
  width: 30px;
}
.text {
  font-size: 5px;
}
</style>
