<template>
  <div class="search-bar">
    <font-awesome-icon
      class="icon-search"
      :icon="['fas', 'search']"
      size="lg"
    />
    <input class="search-input" type="text" :value="Default.real" />
    <font-awesome-icon
      v-show="isTyping"
      class="icon-close"
      :icon="['fas', 'times']"
      size="lg"
    />
  </div>
</template>
<script>
import { toRefs } from "vue";
export default {
  name: "SearchBar",
  components: {},
  props: {
    Default: {
      type: Object,
      default() {
        return {};
      }
    },
    isTyping: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    return {
      ...toRefs(props)
    };
  }
};
</script>
<style scoped>
.search-bar {
  width: 100%;
  padding: 0 10px;
  margin: 6px auto;

  border-radius: 50px;
  background-color: #fff;

  display: flex;
  align-items: center;
}
.search-input {
  flex: 1;
  margin: 0 5px;
  line-height: 18px;
  border: none;
}
input:focus {
  outline: none;
}
</style>
