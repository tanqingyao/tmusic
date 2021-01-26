<template>
  <div class="desc-item">
    <div class="desc-img">
      <slot name="img" />
    </div>
    <div class="desc-info">
      <div class="info-top">
        <slot name="top" />
      </div>

      <div class="info-mid">
        <slot name="mid" />
      </div>
      <div class="info-bottom">
        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "DescItem",
  components: {},
  props: {
    test: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup() {
    return {};
  }
});
</script>
<style scoped>
.desc-item {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #ccc;
}

.desc-info {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 20px 10px;
}
/* 单行显示 */
.info-bottom {
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.info-bottom {
  position: absolute;
  bottom: 20px;
}
</style>
