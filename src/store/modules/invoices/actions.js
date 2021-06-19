import { firestore } from '@/firebase';

export default {
  getInvoices: async ({ commit, state }) => {
    commit('setLoading', true);

    const documents = await firestore.collection('invoices').get();

    documents.forEach((document) => {
      if (!state.invoices.some((invoice) => invoice.docId === document.id)) {
        const data = {
          docId: document.id,
          ...document.data(),
        };

        commit('addInvoice', data);
      }
    });

    commit('setLoading', false);
  },
  editInvoice: async ({ commit, dispatch }, { docId, invoiceId }) => {
    commit('deleteInvoice', docId);

    await dispatch('getInvoices');

    commit('toggleModal');
    commit('toggleEditMode');
    commit('setInvoice', invoiceId);
  },
  deleteInvoice: async ({ commit }, docId) => {
    const invoice = firestore.collection('invoices').doc(docId);

    await invoice.delete();
    commit('deleteInvoice', docId);
  },
};
