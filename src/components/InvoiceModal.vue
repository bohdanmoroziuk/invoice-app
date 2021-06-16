<template>
  <div
    class="invoice-wrap flex flex-column"
    ref="invoiceWrap"
    @click="check"
  >
    <form
      class="invoice-content"
      @submit.prevent="submit"
    >
      <spinner v-if="loading" />

      <h1>{{ title }}</h1>

      <!-- Bill From -->

      <div class="bill-from flex flex-column">
        <h4>Bill from</h4>

        <div class="input flex flex-column">
          <label for="billerStreetAddress">Street Address</label>
          <input type="text" id="billerStreetAddress" v-model.trim="billerStreetAddress">
        </div>

        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity">City</label>
            <input type="text" id="billerCity" v-model.trim="billerCity">
          </div>

          <div class="input flex flex-column">
            <label for="billerZipCode">Zip Code</label>
            <input type="text" id="billerZipCode" v-model.trim="billerZipCode">
          </div>

          <div class="input flex flex-column">
            <label for="billerCountry">Country</label>
            <input type="text" id="billerCountry" v-model.trim="billerCountry">
          </div>
        </div>
      </div>

      <!-- Bill To -->

      <div class="bill-to flex flex-column">
        <h4>Bill To</h4>

        <div class="input flex flex-column">
          <label for="clientName">Name</label>
          <input type="text" id="clientName" v-model.trim="clientName">
        </div>

        <div class="input flex flex-column">
          <label for="clientEmail">Email</label>
          <input type="email" id="clientEmail" v-model.trim="clientEmail">
        </div>

        <div class="input flex flex-column">
          <label for="clientStreetAddress">Street Address</label>
          <input type="text" id="clientStreetAddress" v-model.trim="clientStreetAddress">
        </div>

        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="clientCity">City</label>
            <input type="text" id="clientCity" v-model.trim="clientCity">
          </div>

          <div class="input flex flex-column">
            <label for="clientZipCode">Zip Code</label>
            <input type="text" id="clientZipCode" v-model.trim="clientZipCode">
          </div>

          <div class="input flex flex-column">
            <label for="clientCountry">Country</label>
            <input type="text" id="clientCountry" v-model.trim="clientCountry">
          </div>
        </div>
      </div>

      <!-- Invoice Work Details -->

      <div class="invoice-work flex flex-column">
        <h4>Invoice Work</h4>

        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="invoiceDate">Invoice Date</label>
            <input type="text" id="invoiceDate" v-model.trim="invoiceDate" disabled>
          </div>
          <div class="input flex flex-column">
            <label for="paymentDueDate">Payment Due</label>
            <input type="text" id="paymentDueDate" v-model.trim="paymentDueDate" disabled>
          </div>
        </div>

        <div class="input flex flex-column">
          <label for="paymentTerms">Payment Terms</label>
          <select id="paymentTerms" v-model.number="paymentTerms">
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
          </select>
        </div>
        <div class="input flex flex-column">
          <label for="productDescription">Product Description</label>
          <input type="text" id="productDescription" v-model.trim="productDescription">
        </div>

        <div class="work-items">
          <h3>Item List</h3>

          <table class="item-list">
            <tr class="table-heading flex">
              <th class="item-name">Name</th>
              <th class="qty">Qty</th>
              <th class="price">Price</th>
              <th class="total">Total</th>
            </tr>
            <tr
              class="table-items flex"
              v-for="item of invoiceItemList"
              :key="item.id"
            >
              <td class="item-name">
                <input type="text" v-model.trim="item.name">
              </td>
              <td class="qty">
                <input type="text" v-model.number="item.qty">
              </td>
              <td class="price">
                <input type="text" v-model.number="item.price">
              </td>
              <td class="total flex">
                ${{ item.total = item.qty * item.price }}
              </td>
              <img
                src="@/assets/images/icon-delete.svg"
                alt=""
                @click="deleteInvoiceItem(item.id)"
              >
            </tr>
          </table>

          <div class="flex button" @click="addNewInvoiceItem">
            <img src="@/assets/images/icon-plus.svg" alt="">
            Add New Item
          </div>
        </div>
      </div>

      <!-- Save/Exit -->
      <div class="save flex">
        <div class="left">
          <button class="bg-red" type="button" @click="close">Cancel</button>
        </div>
        <div class="right flex">
          <template v-if="isEditMode">
            <button class="bg-purple" type="submit" @click="updateInvoice">Update Invoice</button>
          </template>
          <template v-else>
            <button class="bg-dark-purple" type="submit" @click="saveDraft">Save Draft</button>
            <button class="bg-purple" type="submit" @click="publishInvoice">Create Invoice</button>
          </template>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable no-alert */
/* eslint-disable no-useless-return */

import { mapState, mapMutations } from 'vuex';

import { nanoid } from 'nanoid';

import { firestore } from '@/firebase';

import Spinner from '@/components/Spinner.vue';

export default {
  name: 'InvoiceModal',
  data() {
    return {
      dateOptions: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      docId: null,
      loading: false,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: 30,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
    };
  },
  watch: {
    paymentTerms: {
      immediate: true,
      handler: 'generatePaymentDueDate',
    },
  },
  computed: {
    ...mapState('invoices', ['isEditMode']),

    title() {
      return this.isEditMode ? 'Edit Invoice' : 'New Invoice';
    },

    invoiceTotal() {
      return this.invoiceItemList.reduce((total, item) => (
        Number.isNaN(item.total) ? total : total + item.total
      ), 0);
    },
  },
  methods: {
    ...mapMutations('invoices', [
      'closeModal',
      'activate',
      'deactivateEditMode',
    ]),

    formatDate(value) {
      return new Date(value).toLocaleDateString('uk', this.dateOptions);
    },
    generateInvoiceDate() {
      this.invoiceDateUnix = Date.now();
      this.invoiceDate = this.formatDate(this.invoiceDateUnix);
    },
    generatePaymentDueDate() {
      const futureDate = new Date();

      this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + this.paymentTerms);
      this.paymentDueDate = this.formatDate(this.paymentDueDateUnix);
    },
    addNewInvoiceItem() {
      this.invoiceItemList.push({
        id: nanoid(6),
        name: '',
        qty: 0,
        price: 0,
        total: 0,
      });
    },
    deleteInvoiceItem(id) {
      this.invoiceItemList = this.invoiceItemList.filter((item) => item.id !== id);
    },
    publishInvoice() {
      this.invoicePending = true;
    },
    saveDraft() {
      this.invoiceDraft = true;
    },
    async uploadInvoice() {
      if (this.invoiceItemList.length === 0) {
        alert('Please ensure you filled out work items!');
        return;
      }

      const invoices = firestore.collection('invoices').doc();

      this.loading = true;

      await invoices.set({
        invoiceId: nanoid(6),
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        invoiceDate: this.invoiceDate,
        invoiceDateUnix: this.invoiceDateUnix,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
        invoicePending: this.invoicePending,
        invoiceDraft: this.invoiceDraft,
        invoicePaid: null,
      });

      this.loading = false;

      this.close();
    },
    async submit() {
      await this.uploadInvoice();
    },
    check(event) {
      if (event.target === this.$refs.invoiceWrap) {
        this.activate();
      }
    },
    close() {
      this.closeModal();

      if (this.isEditMode) {
        this.deactivateEditMode();
      }
    },
  },
  created() {
    this.generateInvoiceDate();
  },
  components: {
    Spinner,
  },
};
</script>

<style lang="scss" scoped>
.invoice-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 900px) {
    left: 90px;
  }

  .invoice-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    h1 {
      margin-bottom: 48px;
      color: #fff;
    }

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }

    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }

    // Bill To / Bill From
    .bill-to,
    .bill-from {
      margin-bottom: 48px;

      .location-details {
        gap: 16px;

        div {
          flex: 1;
        }
      }
    }

    // Invoice Work
    .invoice-work {

      .payment {
        gap: 24px;

        div {
          flex: 1;
        }
      }

      .work-items {

        .item-list {
          width: 100%;
          // Item Table Styling

          .table-heading,
          .table-items {
            gap: 16px;
            font-size: 12px;

            .item-name {
              flex-basis: 50%;
            }

            .qty {
              flex-basis: 10%;
            }

            .price {
              flex-basis: 20%;
            }

            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }

          .table-heading {
            margin-bottom: 16px;

            th {
              text-align: left;
            }
          }

          .table-items {
            position: relative;
            margin-bottom: 24px;

            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }

        .button {
          color: #fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;

          img {
            margin-right: 4px;
          }
        }
      }
    }

    .save {
      margin-top: 60px;

      div {
        flex: 1;
      }

      .right {
        justify-content: flex-end;
      }
    }
  }

  .input {
    margin-bottom: 24px;
  }

  label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  input,
  select {
    width: 100%;
    background-color: #1e2139;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}
</style>
