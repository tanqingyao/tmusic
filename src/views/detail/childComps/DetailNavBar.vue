<template>
  <NavBar class="nav-bar">
    <template #left>
      <div class="back-icon" @click="backClick">
        <img src="~assets/img/common/left_chevron_4.svg" alt="" />
      </div>
    </template>
    <template #center>
      <div class="text">{{ title }}</div>
    </template>
  </NavBar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    backClick() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.nav-bar {
  color: var(--color-text);
  font-size: var(--font-size-small-s);
}
.back-icon {
  margin-top: 5px;
  margin-left: 15px;
  width: 30px;
}
.text {
  width: 250px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
