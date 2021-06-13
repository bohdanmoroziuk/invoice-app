<template>
  <mobile-message v-if="mobile" />
  <div v-else class="app flex">
    <navigation />
    <div class="content flex flex-column">
      <router-view />

      <transition name="invoice">
        <invoice-modal v-if="modal" />
      </transition>

      <exit-confirmation-dialog v-if="active" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Navigation from '@/components/Navigation.vue';
import InvoiceModal from '@/components/InvoiceModal.vue';
import MobileMessage from '@/components/MobileMessage.vue';
import ExitConfirmationDialog from '@/components/ExitConfirmationDialog.vue';

export default {
  name: 'App',
  data() {
    return {
      mobile: false,
    };
  },
  computed: {
    ...mapState('invoices', ['modal', 'active']),
  },
  methods: {
    ...mapActions('invoices', ['getInvoices']),

    checkScreen() {
      this.mobile = window.innerWidth <= 750;
    },
  },
  async created() {
    this.checkScreen();

    window.addEventListener('resize', this.checkScreen);

    await this.getInvoices();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreen);
  },
  components: {
    Navigation,
    InvoiceModal,
    MobileMessage,
    ExitConfirmationDialog,
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

.invoice-enter-active,
.invoice-leave-active {
  transition: 0.8s ease all;
}
.invoice-enter-from,
.invoice-leave-to {
  transform: translateX(-700px);
}

</style>
