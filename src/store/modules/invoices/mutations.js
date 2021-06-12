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
};
