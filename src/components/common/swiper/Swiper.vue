<template>
  <div class="total-swiper">
    <div
      ref="swiper"
      class="swiper"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <slot />
    </div>
    <div class="dots">
      <slot name="indicator" v-if="showIndicator && slider.count > 1">
        <div
          v-for="(item, index) in slider.count"
          class="dot"
          :class="{ active: index + 1 === slider.index }"
        ></div>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  onMounted,
  reactive,
  ref,
  Ref,
  toRef,
  toRefs,
  watchEffect
} from "vue";

import {
  setTransfrom,
  setTransition,
  scrollTo
} from "@/common/utils/scrollElement";
import useTouchElement from "@/common/hooks/useTouchElement";
export default defineComponent({
  name: "Swiper",
  components: {},
  props: {
    /**
     * 监听的数据
     */
    loaded: {
      type: Boolean,
      default: false
    },
    showIndicator: {
      type: Boolean,
      default: true
    },
    sliderDuration: {
      type: Number,
      default: 500
    },
    sliderInterval: {
      type: Number,
      default: 5000
    },
    //滑动超过整个轮播图ratio才切换
    ratio: {
      type: Number,
      default: 0.25
    }
  },
  setup(props) {
    let swiper: Ref = ref(null);

    const silderWidth = computed(() =>
      swiper.value ? swiper.value.offsetWidth : 0
    );

    let slider = reactive({
      count: 0, // 子元素个数
      index: 1 // 当前子元素索引
    });

    /* touch事件 */
    const {
      currentDistance,
      touchDistach,
      useTouchStart,
      useTouchMove,
      useTouchEnd
    } = useTouchElement(swiper);

    /* 轮播事件 */
    // 滚动状态
    let scrolling = false;
    let timer: number;

    // 轮播定时器
    const startTimer = () => {
      timer = window.setInterval(() => {
        slider.index++;
        scrollContent(-silderWidth.value * slider.index);
      }, props.sliderInterval);
    };

    const stopTimer = () => {
      window.clearInterval(timer);
    };

    // 轮播操作
    const handleTouchStart = (e: TouchEvent) => {
      if (scrolling) {
        return;
      }
      stopTimer();
      useTouchStart(e);
    };

    const handleTouchMove = useTouchMove;

    const handleTouchEnd = (e: TouchEvent) => {
      useTouchEnd(e);
      // 判断边界情况
      if (touchDistach.value === 0) {
        return;
      } else if (
        touchDistach.value > 0 &&
        touchDistach.value > props.ratio * silderWidth.value
      ) {
        slider.index--;
      } else if (
        touchDistach.value < 0 &&
        Math.abs(touchDistach.value) > props.ratio * silderWidth.value
      ) {
        slider.index++;
      }
      // 下一个页面的定位
      currentDistance.value = -slider.index * silderWidth.value;

      scrollContent(currentDistance.value);

      startTimer();
    };

    /* DOM相关操作 */
    const handleDOM = () => {
      // 1.前后插入一张图片

      let firstChlid = swiper.value.children.item(0);
      let lastChlid = swiper.value.children.item(slider.count - 1);

      if (slider.count > 1) {
        swiper.value.appendChild(firstChlid.cloneNode(true));
        swiper.value.insertBefore(lastChlid.cloneNode(true), firstChlid);
      }
      // 2.显示第一张图片
      setTransfrom(swiper.value, -silderWidth.value);
    };
    /* 滚动到对应位置 */
    const scrollContent = (position: number) => {
      scrolling = true;

      scrollTo(swiper.value, position);
      correctSwiper();

      scrolling = false;
    };
    // 滚动结束纠正swiper位置
    const correctSwiper = () => {
      // 异步执行:等上一段动画结束后再执行,同步执行则会没有动画直接跳转
      window.setTimeout(() => {
        setTransition(swiper.value, 0);

        if (slider.index >= slider.count + 1) {
          // 最后附加页直接移动到第一页
          slider.index = 1;
        } else if (slider.index <= 0) {
          // 最前附加页直接移动到第最后一页
          slider.index = slider.count;
        }
        setTransfrom(swiper.value, -silderWidth.value * slider.index);
      }, props.sliderDuration);
    };

    onMounted(() => {
      const stop = watchEffect(() => {
        // 加载完毕开始轮播
        if (props.loaded && swiper.value) {
          slider.count = swiper.value.children.length;
          handleDOM();
          startTimer();
        }
      });
    });
    return {
      swiper,
      slider,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      handleDOM
    };
  }
});
</script>
<style scoped>
/* 合页:横向排布的图片,只显示一张 */
.total-swiper {
  overflow: hidden;
  position: relative;
}
/* flex布局将图片横向排布 */
.swiper {
  display: flex;
}

.dots {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}
.dot {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: var(--color-text-l);
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.dot.active {
  width: 20px;
  background-color: var(--color-text-ll);
}
</style>
