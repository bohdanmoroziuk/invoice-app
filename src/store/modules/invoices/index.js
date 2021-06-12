import state from '@/store/modules/invoices/state';
import getters from '@/store/modules/invoices/getters';
import actions from '@/store/modules/invoices/actions';
import mutations from '@/store/modules/invoices/mutations';

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
