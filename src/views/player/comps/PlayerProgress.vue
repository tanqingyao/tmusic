<template>
  <div class="progress-bar">
    <input
      type="range"
      ref="progress"
      :class="{ active: isTouch }"
      min="0"
      :max="duration"
      step="0.05"
      @touchstart="touchStart"
      @touchend="touchEnd"
    />
    <div class="progerss-time">
      <span class="left">{{ parseTimeString(currentTime) }}</span>
      <span class="right">{{ parseTimeString(duration) }}</span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { SET_PLAY_TIME } from "store/mutations-types";
export default {
  name: "PlayerProgress",
  data() {
    return {
      isTouch: false
    };
  },
  computed: {
    ...mapState(["duration", "currentTime"])
  },
  created() {
    this.unwatch = this.progressWatcher();
  },
  methods: {
    progressWatcher() {
      return this.$watch("currentTime", (newVal, oldVal) => {
        this.$refs.progress.value = newVal;
      });
    },
    parseTimeString(num) {
      let min = Math.floor(num / 60);
      let sec = Math.floor(num - min * 60);
      sec = ("00" + sec).slice(-2);
      return `${min}:${sec}`;
    },
    touchStart(e) {
      // 暂停监听value
      this.unwatch();
      this.isTouch = true;
    },
    touchEnd(e) {
      // 跳转至对应时间
      this.$store.commit(SET_PLAY_TIME, Number.parseFloat(e.target.value));
      // 开始监听
      this.unwatch = this.progressWatcher();
      // 改变样式
      this.isTouch = false;
    }
  }
};
</script>
<style scoped>
.progress-bar {
  text-align: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 60px;
  height: 40px;
  color: var(--color-background);
}
.progerss-time {
  height: 20px;
  line-height: 20px;
  padding: 0 35px;
}
/*横条样式*/
input[type="range"] {
  -webkit-appearance: none; /*清除系统默认样式*/
  width: 80%;
  background: #ddd;
  height: 3px;
  /* border-radius: 80%; */
  outline: none;
}
/*拖动块的样式*/
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; /*清除系统默认样式*/
  height: 10px;
  width: 10px;
  background: #ddd;
  border-radius: 50%;
  border: solid 1px #eee;
}
input[type="range"].active::-webkit-slider-thumb {
  height: 20px;
  width: 20px;
}
</style>
