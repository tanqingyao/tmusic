<template>
  <Swiper ref="swiper">
    <SwiperItem v-for="item in banners">
      <img :src="item.picUrl" @load="imgLoad" alt="轮播图片" />
    </SwiperItem>
  </Swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "RecommendSwiper",
  components: { Swiper, SwiperItem },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      imgCount: 0
    };
  },
  methods: {
    imgLoad() {
      this.imgCount++;
      if (this.imgCount === this.banners.length) {
        // console.log("imgLoad Compelete");
        this.$refs.swiper.handleDOM();
        this.$refs.swiper.startTimer();
      }
    }
  }
};
</script>
