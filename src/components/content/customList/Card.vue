<template>
  <div class="card-body">
    <div class="card-item">
      <div class="list-header">
        <slot name="header" />
      </div>
      <div class="list-content">
        <slot name="content" />
      </div>
      <div class="list-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Card"
});
</script>
<style scoped>
.card-body {
  padding: 20px;
  border-radius: 5%;
}
.card-item {
  padding: 10px 0;
  margin: 10px 0;
  border-radius: 5%;
  background-color: var(--color-highlight-background);
}
/* header */
.list-header {
  line-height: 22px;
  height: 22px;
  text-align: center;
  margin: 15px;
  font-weight: 700;
}
.list-header button {
  font-size: 13px;
  line-height: 22px;
  height: 22px;
  width: 60px;

  border-radius: 10px;
  border: solid 1px #bbb;
  background-color: var(--color-background);
  outline: none;
}
/* content */
.list-content {
  display: flex;
  flex-direction: column;
}
/* footer */
.list-footer {
  text-align: center;
  font-size: 13px;
}
</style>
