<template>
  <div class="singer">
    <ul>
      <li v-for="(item, index) in list" :ref="setLyricRefs">
        {{ item }}
      </li>
    </ul>
    <div class="scroll-line">
      <div class="line-left">
        <img src="~assets/img/player/mini_play.svg" alt="播放" />
      </div>
      <div class="line-center"></div>
      <div class="line-right">时间</div>
    </div>
    <button @click="btnClick">点击</button>
  </div>
</template>
<script>
export default {
  name: "Singer",
  components: {},
  data() {
    return {
      list: ["test1", "test2", "test3", "test4"],
      lyricRefs: []
    };
  },
  created() {
    console.log("Singer created");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
    // this.lyricRefs = [];
  },
  methods: {
    setLyricRefs(el) {
      this.lyricRefs.push(el);
    },
    btnClick() {
      // 方法一：
      console.log(this.lyricRefs[0].offsetHeight);

      // 方法二 :ref="`list${index}`"
      // console.log(this.$refs[`list1`].offsetHeight);
    }
  }
};
</script>
<style scoped>
.singer {
  height: 100vh;
  background-color: var(--color-background-d);
}
.scroll-line {
  position: fixed;
  left: 0;
  right: 0;
  top: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.line-left,
.line-right {
  width: 10%;
}
.line-left img {
  width: 40%;
  margin-left: 15px;
  margin-top: 5px;
}
.line-center {
  height: 1px;
  width: 70%;
  background-color: var(--color-text-l);
}
</style>
