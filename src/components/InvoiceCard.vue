<template>
  <router-link
    class="invoice flex"
    :to="invoicePagePath"
  >
    <div class="left flex">
      <span class="tracking-number">#{{ invoice.invoiceId }}</span>
      <span class="due-date">{{ invoice.paymentDueDate }}</span>
      <span class="person">{{ invoice.clientName }}</span>
    </div>
    <div class="right flex">
      <span class="price">{{ invoice.invoiceTotal }}</span>
      <div
        class="status-button flex"
        :class="{ [status]: status }"
      >
        <span>{{ statusText }}</span>
      </div>
      <div class="icon">
        <img src="@/assets/images/icon-arrow-right.svg" alt="">
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'InvoiceCard',
  props: {
    invoice: {
      type: Object,
      required: true,
    },
  },
  computed: {
    invoicePagePath() {
      return {
        name: 'invoice',
        params: {
          id: this.invoice.invoiceId,
        },
      };
    },
    status() {
      if (this.invoice.invoicePaid) return 'paid';
      if (this.invoice.invoiceDraft) return 'draft';
      if (this.invoice.invoicePending) return 'pending';
      return null;
    },
    statusText() {
      if (!this.status) return '';

      return this.status.charAt(0).toUpperCase().concat(this.status.slice(1));
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  background-color: #1e2139;
  align-items: center;

  span {
    font-size: 13px;
  }

  .left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;

    span {
      flex: 1;
    }

    .tracking-number {
      text-transform: uppercase;
    }
  }

  .right {
    gap: 16px;
    flex-basis: 40%;
    align-items: center;

    .price {
      flex: 1;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
