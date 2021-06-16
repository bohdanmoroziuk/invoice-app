<template>
  <div class="dialog flex">
    <div class="content">
      <p>Are you sure you want to exit? Your changes will not be saved?</p>
      <div class="actions flex">
        <button class="bg-purple" @click="cancel">Cancel</button>
        <button class="bg-red" @click="confirm">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'ExitConfirmationDialog',
  computed: {
    ...mapState('invoices', ['isEditMode']),
  },
  methods: {
    ...mapMutations('invoices', [
      'deactivate',
      'closeModal',
      'deactivateEditMode',
    ]),

    cancel() {
      this.deactivate();
    },
    confirm() {
      this.deactivate();
      this.closeModal();

      if (this.isEditMode) {
        this.deactivateEditMode();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  z-index: 100;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  .content {
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: #252945;
    color: #fff;

    p {
      text-align: center;
    }

    .actions {
      margin-top: 24px;

        button {
        flex: 1;
      }
    }
  }
}
</style>
