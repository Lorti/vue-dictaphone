<template>
  <div id="app">
    <h1>🎙️ Vue.js Dictaphone</h1>
    <dictaphone @stop="handleRecording($event)">
      <div slot-scope="{ isRecording, startRecording, stopRecording, stream }">
        <button v-if="!isRecording"
                @click="startRecording">Start recording</button>
        <button v-else
                @click="stopRecording">Stop recording</button>
        <spectrum-analyser :stream="stream"
                           :style="{ opacity: isRecording ? 1 : .5 }"/>
      </div>
    </dictaphone>
    <template v-if="audioSource">
      <audio :src="audioSource" controls></audio>
    </template>
  </div>
</template>

<script>
import Dictaphone from '@/components/Dictaphone';
import SpectrumAnalyser from '@/components/SpectrumAnalyser';

export default {
  name: 'app',
  data() {
    return {
      audioSource: null,
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleRecording({ blob, src }) {
      this.audioSource = src;
    },
  },
  components: {
    Dictaphone,
    SpectrumAnalyser,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
