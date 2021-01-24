<template>
  <NavBar>
    <template #left>
      <div class="back-icon" @click="$router.back">
        <img src="~assets/img/common/arrow_left.svg" alt="" />
      </div>
    </template>
    <template #center>
      <SearchBar />
    </template>
  </NavBar>
</template>
<script>
import SearchBar from "components/common/searchbar/SearchBar";
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "SearchNavBar",
  components: {
    NavBar,
    SearchBar
  },
  setup() {
    // const backClick = () => {};
    // return {
    //   backClick
    // };
  }
};
</script>
<style scoped>
.back-icon {
  margin-top: 5px;
  margin-left: 15px;
  width: 30px;
}
</style>
