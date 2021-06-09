<template>
  <div class="app flex">
    <navigation />
    <div class="content flex flex-column">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation,
  },
};
</script>

<style lang="scss" scoped>
.app {
  background-color: #141625;
  min-height: 100vh;
  flex-direction: column;

  @media (min-width: 900px) {
    flex-direction: row;
  }

  .content {
    padding: 0 20px;
    flex: 1;
    position: relative;
  }
}
</style>
