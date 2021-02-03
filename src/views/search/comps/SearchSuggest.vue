<template>
  <div class="search-suggest">
    <div class="suggest-title">搜索"{{ searchKey }}"</div>
    <div class="suggest-list">
      <div
        class="suggest-item"
        v-for="item in suggests"
        @click="handleClick(item)"
      >
        <span>
          <icon class="icon-search" :icon="['fas', 'search']" size="sm" />
          {{ item.key }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchSuggest",
  components: {},
  props: {
    searchKey: {
      type: String
    },
    suggests: {
      type: Array
    }
  },
  setup() {
    const handleClick = e => {
      console.log(e);
    };
    return {
      handleClick
    };
  }
};
</script>
<style scoped>
.search-suggest {
  position: fixed;
  top: 44px;
  left: 70px;
  right: 10px;
  z-index: 9;
  background-color: #fff;

  box-shadow: 0 0 5px 3px rgba(100, 100, 100, 0.1);
}
.suggest-title {
  color: darkcyan;
}
.suggest-title,
.suggest-item {
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  border: solid 1px #eee;
}
</style>
