<template>
  <NavBar>
    <template #left>
      <icon
        class="back-icon"
        @click="$router.back"
        :icon="['fas', 'arrow-left']"
        size="lg"
      />
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
  margin: 0 15px;
  width: 30px;
}
</style>
