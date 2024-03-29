<template>
  <div class="home container">
    <header class="header flex">
      <div class="left flex flex-column">
        <h2>Invoices</h2>
        <span>There are {{ invoices.length }} total invoices</span>
      </div>
      <div class="right flex">
        <div class="filter flex" @click="toggleMenu">
          <span>Filter by status: <span v-if="status">{{ status }}</span></span>
          <img src="@/assets/images/icon-arrow-down.svg" alt="">
          <ul class="filter-menu" v-show="menu">
            <li @click="setStatus('draft')">Draft</li>
            <li @click="setStatus('pending')">Pending</li>
            <li @click="setStatus('paid')">Paid</li>
            <li @click="setStatus('')">Clear Filter</li>
          </ul>
        </div>
        <div class="button flex" @click="openModal">
          <div class="inner-button flex">
            <img src="@/assets/images/icon-plus.svg" alt="">
          </div>
          <span>New Invoice</span>
        </div>
      </div>
    </header>

    <main v-if="hasInvoices">
      <invoice-card
        v-for="invoice of filteredInvoices"
        :key="invoice.invoiceId"
        :invoice="invoice"
      />
    </main>
    <div v-else class="empty flex flex-column">
      <img src="@/assets/images/illustration-empty.svg" alt="">
      <h3>There is nothing here</h3>
      <p>Create a new invoice by clicking the New Invoice button and get started</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import InvoiceCard from '@/components/InvoiceCard.vue';

export default {
  name: 'Home',
  data() {
    return {
      menu: false,
      status: null,
    };
  },
  computed: {
    ...mapState('invoices', ['invoices']),

    hasInvoices() {
      return this.filteredInvoices.length > 0;
    },
    filteredInvoices() {
      if (this.status === 'draft') {
        return this.invoices.filter((invoice) => invoice.invoiceDraft);
      }
      if (this.status === 'pending') {
        return this.invoices.filter((invoice) => invoice.invoicePending);
      }
      if (this.status === 'paid') {
        return this.invoices.filter((invoice) => invoice.invoicePaid);
      }
      return this.invoices.slice();
    },
  },
  methods: {
    ...mapMutations('invoices', ['openModal']),

    toggleMenu() {
      this.menu = !this.menu;
    },
    setStatus(status) {
      this.status = status;
    },
  },
  components: {
    InvoiceCard,
  },
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;

  .header {
    margin-bottom: 65px;

    .left,
    .right {
      flex: 1;
    }

    .right {
      justify-content: flex-end;
      align-items: center;

      .button,
      .filter {
        align-items: center;

        span {
          font-size: 12px;
        }
      }

      .filter {
        position: relative;
        margin-right: 40px;
        cursor: pointer;

        img {
          margin-left: 12px;
          width: 9px;
          height: 5px;
        }

        .filter-menu {
          width: 120px;
          position: absolute;
          top: 25px;
          list-style: none;
          background-color: #1e2139;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

          li {
            cursor: pointer;
            font-size: 12px;
            padding: 10px 20px;

            &:hover {
              color: #1e2139;
              background-color: #fff;
            }
          }
        }
      }

      .button {
        padding: 8px 10px;
        background-color: #7c5dfa;
        border-radius: 40px;

        .inner-button {
          margin-right: 8px;
          border-radius: 50%;
          padding: 8px;
          align-items: center;
          justify-content: center;
          background-color: #fff;

          img {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }

  .empty {
    margin-top: 160px;
    align-items: center;

    img {
      width: 214px;
      height: 200px;
    }

    h3 {
      font-size: 20px;
      margin-top: 40px;
    }

    p {
      text-align: center;
      max-width: 300px;
      font-size: 14px;
      font-weight: 300;
      margin-top: 16px;
    }
  }
}
</style>
