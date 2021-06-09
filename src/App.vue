<template>
  <mobile-message v-if="mobile" />
  <div v-else class="app flex">
    <navigation />
    <div class="content flex flex-column">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import MobileMessage from '@/components/MobileMessage.vue';

export default {
  name: 'App',
  data() {
    return {
      mobile: false,
    };
  },
  methods: {
    checkScreen() {
      this.mobile = window.innerWidth <= 750;
    },
  },
  created() {
    this.checkScreen();

    window.addEventListener('resize', this.checkScreen);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreen);
  },
  components: {
    Navigation,
    MobileMessage,
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
