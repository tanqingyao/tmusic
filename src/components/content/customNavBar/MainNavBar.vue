<template>
  <NavBar>
    <template #center>
      <SearchBar
        class="search-bar"
        :Default="{ real: '默认搜索' }"
        @click="$router.push('/search')"
      />
    </template>
    <template #right>
      <icon
        @click="settingClick"
        class="navbar-right"
        :icon="['fas', 'user']"
        size="sm"
      />
    </template>
  </NavBar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import SearchBar from "components/common/searchbar/SearchBar";
export default {
  name: "MainNavBar",
  components: {
    NavBar,
    SearchBar
  },
  setup() {
    // /* 路由相关 */
    // const $router = useRouter();
    // const handleSearch = () => {
    //   $router.push("/search");
    // };
    return {
      // handleSearch
    };
  },
  methods: {
    settingClick() {
      if (this.$route.path !== "/profile") {
        this.$router.push("/profile");
      }
    }
  }
};
</script>
<style scoped>
.search-bar {
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 50px;
  background-color: #fff;
  position: relative;
  z-index: 9;
}
.navbar-right {
  margin: 0 10px;
  width: 30px;
}
</style>
