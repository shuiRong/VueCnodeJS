<template>
  <div class='divider'></div>
</template>

<script>
/**
 * 分割线组件
 * 完全没有逻辑，只是一条‘简简单单’的分割线
 */
export default {
  name: "Divider"
};
</script>

<style lang="scss" scoped>
.divider {
  display: block;
  height: 1px;
  width: 100%;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  list-style: none;
  background: #e8e8e8;
}
</style>

