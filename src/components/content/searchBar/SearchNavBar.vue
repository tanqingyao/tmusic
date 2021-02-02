<template>
  <NavBar class="search-nav">
    <template #left>
      <icon
        class="back-icon"
        @click="$router.back"
        :icon="['fas', 'arrow-left']"
        size="sm"
      />
    </template>
    <template #center>
      <div class="search-head">
        <div class="search-bar">
          <icon
            v-show="!searchKey"
            class="icon-search"
            :icon="['fas', 'search']"
            size="sm"
          />
          <input
            class="search-input"
            type="text"
            :placeholder="dftSearchKey"
            v-model="searchKey"
            @focusin="$emit('focus-state', true)"
            @focusout="$emit('focus-state', false)"
          />
          <icon
            v-show="searchKey"
            class="icon-close"
            :icon="['fas', 'times']"
            size="sm"
          />
        </div>
      </div>
    </template>
  </NavBar>
</template>
<script lang="ts">
import NavBar from "@/components/common/navbar/NavBar.vue";
import { defineComponent, ref, toRef, watchEffect } from "vue";
export default defineComponent({
  name: "SearchNavBar",
  components: {
    NavBar
  },
  props: {
    dftSearchKey: {
      type: String,
      default: ""
    }
  },
  emits: {
    "focus-state": null,
    "update:searchKey": null
  },
  setup(props, { emit }) {
    let searchKey = ref("");
    watchEffect(() => {
      emit("update:searchKey", searchKey.value);
    });
    return {
      searchKey
    };
  }
});
</script>
<style scoped>
.search-nav {
  box-shadow: none;
}
.back-icon {
  margin: 0 15px;
  width: 30px;
}
.search-head {
  height: 44px;
  padding: 8px 0px;
}
.search-bar {
  border-bottom: solid 1px #666;
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

  /* 多余文字省略 */
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
input:focus {
  outline: none;
}
</style>
