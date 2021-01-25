<template>
  <Swiper ref="swiper">
    <SwiperItem v-for="item in banners">
      <img :src="item.img" @load="imgLoad" alt="轮播图片" />
    </SwiperItem>
  </Swiper>
</template>
<script>
import { defineComponent, ref, onMounted, toRefs } from "vue";
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
  setup(props) {
    const { banners } = toRefs(props);
    const swiper = ref(null);
    let counter = 0;
    const imgLoad = () => {
      counter++;
      if (counter === banners.value.length) {
        swiper.value.handleDOM();
        swiper.value.startTimer();
      }
    };
    return {
      swiper,
      imgLoad
    };
  }
});
</script>
