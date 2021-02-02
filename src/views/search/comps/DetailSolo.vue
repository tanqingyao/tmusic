<template>
  <div>solo</div>
</template>
<script>
import { ListItem } from "@/components/content/customList";
export default {
  name: "RecommendList",
  components: {
    ListItem
  },
  props: {
    album: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    unitChange(value) {
      return (value / 10000).toFixed(2);
    },
    imgload() {
      this.$emit("RecommedImgLoad");
    },
    songClick(id) {
      // console.log(id);
      this.$router.push("/detail/songlist/" + id);
    }
  }
};
</script>
<style scoped></style>
