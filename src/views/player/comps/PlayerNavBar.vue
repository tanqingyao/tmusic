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
        <span> - </span>
        <span>{{ singer }}</span>
      </div>
    </template>
  </NavBar>
</template>
<script>
import { mapState } from "vuex";
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "PlayerNavBar",
  emits: {
    "change-screen": null
  },
  components: {
    NavBar
  },
  computed: {
    ...mapState(["currentSong"]),
    singer() {
      return this.currentSong.singers
        ? Array.from(this.currentSong.singers, ({ id, name }) => name).join("/")
        : "";
    }
  },
  methods: {
    backIconClick() {
      this.$emit("change-screen");
    }
  }
};
</script>
<style scoped>
.player-nav-bar {
  height: 55px;
  width: 100vw;
}
.down-icon {
  margin-top: 7px;
  width: 30px;
  z-index: 9;
}
.text {
  font-size: 5px;
}
</style>
