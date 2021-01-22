<template>
  <div ref="wrapper">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import { debounce } from "common/utils";
// 封装滚动组件
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
BScroll.use(Pullup);
export default {
  name: "Scroll",
  props: {
    /**
     * 监听的数据
     */
    data: {
      type: Number,
      default: -1
    },
    requestData: {
      type: Function,
      default() {
        return console.log("pulling up...");
      }
    },
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 3
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullUpLoad: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      scroll: null,
      isPullUpLoad: false
    };
  },
  created() {
    this.debouncedRefresh = debounce(this.refresh, 200);
  },
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    /* 初始化scroll,监听事件 */
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      // 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        pullUpLoad: this.pullUpLoad
      });
      /* 监听滚动位置 */
      if (this.listenScroll) {
        this.scroll.on("scroll", pos => {
          this.$emit("scroll", pos);
        });
      }
      /* 监听滚动到底部，用于上拉加载 */
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", this.pullingUpHandler);
      }
    },
    /* scroll相关方法 */
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    scrollBy(x, y, time = 500) {
      this.scroll && this.scroll.scrollBy(x, y, time);
    },
    scrollToElement(el, time = 500, offsetX = true, offsetY = true) {
      this.scroll && this.scroll.scrollToElement(el, time, offsetX, offsetY);
    },
    finishPullUp() {
      // 等请求完成后,数据更新展示后,不能再次刷新,设置两秒后再次刷新
      setTimeout(() => {
        this.scroll && this.scroll.finishPullUp();
      }, 2000);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
      // console.log("scroll refresh");
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
    /* 异步处理方法 */
    async pullingUpHandler() {
      this.isPullUpLoad = true;
      await this.requestData();
      this.finishPullUp();
      this.refresh();
      this.isPullUpLoad = false;
    }
  },
  watch: {
    // 监听数据的变化，防抖处理刷新
    data(newVal, oldVal) {
      this.debouncedRefresh();
    }
  }
};
</script>

<style scoped></style>
