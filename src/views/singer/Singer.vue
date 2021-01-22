<template>
  <div>
    Singer
  </div>
  <ul>
    <li v-for="(item, index) in list" :ref="setLyricRefs">
      {{ item }}
    </li>
  </ul>
  <button @click="btnClick">点击</button>
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
<style scoped></style>
