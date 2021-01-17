<template>
  <div class="detail">
    <DetailNavBar :title="navBarTitle" />
    <Scroll ref="scroll" class="wrapper">
      <DetailCover :cover="coverLogo" />
      <Songlist :songlist="albumSonglist" />
    </Scroll>
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailCover from "./childComps/DetailCover";
import Songlist from "./childComps/Songlist";

import { _getSonglistById } from "network/detail";

import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    Songlist,
    DetailCover,
    Scroll
  },
  data() {
    return {
      type: null,
      navBarTitle: "",
      albumSonglist: [],
      coverLogo: ""
    };
  },
  mounted() {
    let type = this.$route.params.category;
    let albumID = this.$route.params.id;
    this.getSonglist(albumID);
  },
  methods: {
    getSonglist(albumID) {
      _getSonglistById(albumID).then(res => {
        // console.log(res);
        let data = res.data.data;
        this.navBarTitle = data.desc;
        this.coverLogo = data.logo;
        this.albumSonglist = data.songlist;
      });
    }
  }
};
</script>
<style scoped>
.detail {
  height: 100vh;
  position: relative;
}
.wrapper {
  height: calc(100% - 44px - 60px);

  overflow: hidden;
  position: relative;
}
</style>
