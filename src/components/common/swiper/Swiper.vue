<template>
  <div class="total-swiper">
    <div
      ref="swiper"
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot />
    </div>
    <div class="dots">
      <slot name="indicator" v-if="showIndicator && sliderCount > 1">
        <div
          v-for="(item, index) in sliderCount"
          class="dot"
          :class="{ active: index + 1 === sliderIndex }"
        ></div>
      </slot>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Swiper",
  components: {},
  props: {
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
  data() {
    return {
      sliderCount: 0,
      swiperWidth: 0,
      swiperStyle: {},
      sliderIndex: 1 //当前slider的index
    };
  },
  mounted() {
    // 1.监听图片加载情况
    // 2.操作dom,前后添加图片,添加样式
    // this.handleDOM();
    // 3.开始滑动
    // this.startTimer();
  },
  methods: {
    handleDOM() {
      // console.log("开始操作DOM");
      //   1.获取子节点
      let sliderElements = this.$refs.swiper.children;
      this.sliderCount = sliderElements.length;
      let firstChlid = sliderElements.item(0).cloneNode(true);
      let lastChlid = sliderElements.item(this.sliderCount - 1).cloneNode(true);
      //   2.多于一张图片,前后插入一张图片
      //   if (length > 1) {
      //     let swiperElement = this.$refs.swiper;
      //     swiperElement.appendChild(firstChlid);
      //     swiperElement.appendChild(lastChlid);
      //     console.log(swiperElement);
      //   }
      let swiperElement = this.$refs.swiper;
      swiperElement.appendChild(firstChlid);
      swiperElement.insertBefore(lastChlid, sliderElements.item(0));
      this.swiperWidth = swiperElement.offsetWidth;
      this.swiperStyle = swiperElement.style;
      //   3.显示第一张图片
      this.setTransfrom(-this.swiperWidth);
    },
    startTimer() {
      this.timer = window.setInterval(() => {
        this.sliderIndex++;
        this.scrollTo(-this.swiperWidth * this.sliderIndex);
      }, this.sliderInterval);
    },
    stopTimer() {
      window.clearInterval(this.timer);
    },
    /* DOM元素相关操作 */
    scrollTo(position) {
      this.scrolling = true;
      //   console.log("正常滑动");
      this.setTransition(this.sliderDuration);
      this.setTransfrom(position);
      // 调整位置
      this.adjustPostion();
      this.scrolling = false;
    },
    setTransfrom(position) {
      // console.log("setTransfrom", position, this.$refs.swiper.style.transform);
      // 设置移动位置
      this.swiperStyle.transform = `translate(${position}px, 0)`;
    },
    setTransition(duration) {
      // 设置滚动动画
      this.swiperStyle.transition = `transform ${duration}ms`;
    },
    adjustPostion() {
      // 异步执行:等上一段动画结束后再执行,
      // 同步执行则会没有动画直接跳转
      window.setTimeout(() => {
        //   最后附加页直接移动到第一页
        this.setTransition(0);
        if (this.sliderIndex >= this.sliderCount + 1) {
          this.sliderIndex = 1;
          this.setTransfrom(-this.swiperWidth * this.sliderIndex);
        } else if (this.sliderIndex <= 0) {
          //   最前附加页直接移动到第最后一页
          this.sliderIndex = this.sliderCount;
          this.setTransfrom(-this.swiperWidth * this.sliderIndex);
        }
      }, this.sliderDuration);
    },
    /* touch事件 */
    touchStart(e) {
      if (this.scrolling) {
        return;
      }
      // 暂停轮播
      this.stopTimer();
      //   pageX包括滚动条的视口宽度,clientX不包括滚动条
      this.StartX = e.touches[0].pageX;
    },
    touchMove(e) {
      let MoveX = e.touches[0].pageX;
      // 移动距离
      this.touchDistance = MoveX - this.StartX;

      // 自动轮播已经滑动的距离
      let currentDistance = -this.sliderIndex * this.swiperWidth;

      // 开始移动
      this.setTransfrom(this.touchDistance + currentDistance);
    },
    touchEnd(e) {
      // 判断触摸移动后的边界情况
      if (this.touchDistance === 0) {
        return;
      } else if (
        this.touchDistance > 0 &&
        Math.abs(this.touchDistance) > this.ratio * this.swiperWidth
      ) {
        this.sliderIndex--;
      } else if (
        this.touchDistance < 0 &&
        Math.abs(this.touchDistance) > this.ratio * this.swiperWidth
      ) {
        this.sliderIndex++;
      }
      //   滚动到对应位置
      this.scrollTo(-this.swiperWidth * this.sliderIndex);
      // 开始自动轮播
      this.startTimer();
    }
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
