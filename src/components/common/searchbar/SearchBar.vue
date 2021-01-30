<template>
  <div class="search-bar">
    <icon class="icon-search" :icon="['fas', 'search']" size="sm" />
    <input class="search-input" type="text" :placeholder="input" />
    <icon
      v-show="input"
      class="icon-close"
      :icon="['fas', 'times']"
      size="sm"
    />
  </div>
</template>
<script lang="ts">
export default {
  name: "SearchBar",
  props: {
    input: {
      type: String,
      default: ""
    }
  }
};
</script>
<style scoped>
.search-bar {
  width: 100%;
  height: 100%;
  padding: 0 10px;

  display: flex;
  align-items: center;
}
.search-input {
  flex: 1;
  margin: 0 5px;
  line-height: 18px;
  border: none;
  background-color: inherit;
}
input:focus {
  outline: none;
}
</style>
