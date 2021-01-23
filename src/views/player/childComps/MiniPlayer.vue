<template>
  <div>
    <MiniTabBar
      @changeScreen="$emit('changeScreen')"
      @menuBtnClick="isShow = true"
    />

    <transition name="fade">
      <PlayerList
        v-show="isShow"
        v-model:isShow="isShow"
        :playList="playList"
      />
    </transition>
  </div>
</template>
<script>
import { PlayerList, MiniTabBar } from "components/content/miniPlayer";

import { mapState } from "vuex";
export default {
  name: "MiniPlayer",
  components: {
    PlayerList,
    MiniTabBar
  },
  emits: {
    changeScreen: null
  },
  props: {
    currentTime: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    ...mapState(["playList"])
  },
  methods: {}
};
</script>
<style scoped>
.fade-enter-active {
  transition: all 0.4s ease-in-out;
}
.fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
