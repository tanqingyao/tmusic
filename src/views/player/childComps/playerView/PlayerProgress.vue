<template>
  <div class="player-content">
    <div class="progress-bar">
      <input
        type="range"
        id="progress-bar"
        min="0"
        :max="duration"
        :value="currentTime"
        step="0.05"
      />
      <div class="progerss-time">
        <span class="left">{{ parseTimeString(currentTime) }}</span>
        <span class="right">{{ parseTimeString(duration) }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PlayerContent",
  components: {},
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
    return {};
  },
  methods: {
    parseTimeString(num) {
      let min = Math.floor(num / 60);
      let sec = Math.floor(num - min * 60);
      return `${min}:${sec}`;
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
</style>
