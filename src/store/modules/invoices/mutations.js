export default {
  openModal: (state) => {
    state.modal = true;
  },
  closeModal: (state) => {
    state.modal = false;
  },
  toggleModal: (state) => {
    state.modal = !state.modal;
  },
  activate: (state) => {
    state.active = true;
  },
  deactivate: (state) => {
    state.active = false;
  },
  addInvoice: (state, invoice) => {
    state.invoices = [
      invoice,
      ...state.invoices,
    ];
  },
  setLoading: (state, loading) => {
    state.loading = loading;
  },
};
