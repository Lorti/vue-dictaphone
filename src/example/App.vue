<template>
  <div id="app">
    <h1>🎙️ Vue.js Dictaphone</h1>

    <template v-if="showError">
      Your browser doesn’t support audio recording or you’ve blocked microphone access.
    </template>

    <template v-else>
      <dictaphone @stop="handleRecording($event)" @error="handleError">
        <template slot-scope="{ isRecording, startRecording, stopRecording, deleteRecording }">
          <button v-if="!isRecording" @click="startRecording">Start recording</button>
          <button v-else @click="stopRecording">Stop recording</button>
          <spectrum-analyser :style="{ opacity: isRecording ? 1 : .5 }"/>
        </template>
      </dictaphone>

      <template v-if="audioSource">
        <audio :src="audioSource" controls></audio>
      </template>
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
      showError: false,
    };
  },
  methods: {
    handleError() {
      this.showError = true;
    },
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
