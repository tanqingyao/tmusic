<template>
  <div class="list-item">
    <div class="item-img">
      <slot name="img" />
    </div>
    <div class="item-info">
      <div class="item-title">
        <slot name="title" />
      </div>
      <div class="item-desc">
        <slot name="desc" />
      </div>
      <div class="info-bottom">
        <span class="bottom-left left">
          <slot name="btm-left" />
        </span>
        <span class="bottom-right left">
          <slot name="btm-right" />
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MusicListItem"
};
</script>
<style scoped>
.list-item {
  width: 100%;
  height: 80px;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-img {
  padding: 5px;
}
.item-img img {
  width: 60px;
  display: block;
  border-radius: 5px;
}

.item-info {
  width: 100%;
  font-size: var(--font-size-medium);
  color: var(--color-text);
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-info .item-desc {
  font-size: var(--font-size-small-s);
  color: var(--color-text-d);
  margin-top: 5px;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom span {
  width: 110px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.info-bottom .bottom-left {
  color: var(--color-text-d);
  margin-right: 20px;
}
.info-bottom .bottom-right {
  color: var(--color-text-d);
}
</style>
