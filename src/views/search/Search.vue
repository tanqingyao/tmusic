<template>
  <SearchNavBar :Default="Default" />
</template>
<script>
import SearchNavBar from "./childComp/SearchNavBar";

import { defineComponent, toRefs, ref, reactive, onMounted } from "vue";

import {
  getSearchDefault,
  getSearchSuggest,
  getSearchHot,
  getSearchCloud
} from "network/search";
export default defineComponent({
  name: "Search",
  components: {
    SearchNavBar
  },
  props: {
    searchKey: {
      type: String,
      default: "林俊杰"
    }
  },
  setup(props) {
    let Default = reactive({ real: "", show: "" });
    const _getSearchInfo = async () => {
      const dft = await getSearchDefault();
      Default.real = dft.real;
      Default.show = dft.show;
      // const suggests = await getSearchSuggest(props.searchKey);
      // const hots = await getSearchHot();
      // const songs = await getSearchCloud(props.searchKey);
      // console.log(Default, suggests, hots, songs);
    };
    onMounted(() => {
      _getSearchInfo();
    });
    console.log();
    return {
      Default
    };
  }
});
</script>
<style scoped></style>
