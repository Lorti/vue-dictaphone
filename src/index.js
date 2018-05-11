import Dictaphone from '@/Dictaphone';

const VueDictaphone = {
  install(Vue) {
    Vue.component('vue-dictaphone', Dictaphone);
  },
};

export default VueDictaphone;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueDictaphone);
}
