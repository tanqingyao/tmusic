<template>
  <NavBar class="player-nav-bar">
    <template #left>
      <img
        @click="backIconClick"
        class="down-icon"
        src="~assets/img/common/down.svg"
        alt="向下关闭"
      />
    </template>
    <template #center>
      <div class="text">
        <span>{{ currentSong.name }}</span>
        <span>{{ currentSong.singer }}</span>
      </div>
    </template>
  </NavBar>
</template>
<script>
import { mapState } from "vuex";
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "PlayerNavBar",
  components: {
    NavBar
  },
  computed: {
    ...mapState(["currentSong"])
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
  background-color: var(--color-highlight-background);
  height: 55px;
  width: 100vw;
}
.down-icon {
  margin-top: 7px;
  width: 30px;
}
.text {
  font-size: 5px;
}
</style>
