<template>
  <div class="mobile-message flex flex-column">
    <h2 class="title">Sorry, this app is not supported on Mobile Devices</h2>
    <p class="recommendation">To use this app, please use a computer or Tablet</p>
  </div>
</template>

<script>
export default {
  name: 'MobileMessage',
};
</script>

<style lang="scss" scoped>
.mobile-message {
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #141625;
  color: #fff;

  .recommendation {
    margin-top: 16px;
  }
}
</style>
