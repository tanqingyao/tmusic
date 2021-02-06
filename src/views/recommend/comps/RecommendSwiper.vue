<template>
  <Swiper ref="swiper" :loaded="counter !== 0 && counter === banners.length">
    <SwiperItem v-for="item in banners">
      <img v-lazy="item.img" @load="counter++" alt="轮播图片" />
    </SwiperItem>
  </Swiper>
</template>
<script>
import { defineComponent, ref } from "vue";
import { Swiper, SwiperItem } from "components/common/swiper";
export default defineComponent({
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
  setup() {
    const swiper = ref(null);
    // 记录图片加载情况
    let counter = ref(0);
    return {
      swiper,
      counter
    };
  }
});
</script>
