import Dictaphone from '@/components/Dictaphone';
import SpectrumAnalyser from '@/components/SpectrumAnalyser';

const Plugin = {
  install(Vue) {
    Vue.component('vue-dictaphone', Dictaphone);
    Vue.component('vue-dictaphone-spectrum-analyser', SpectrumAnalyser);
  },
};

export default Plugin;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin);
}
