<template>
  <div v-if="mediaRecorder">
    <slot :isRecording="isRecording"
          :startRecording="startRecording"
          :stopRecording="stopRecording"
          :deleteRecording="deleteRecording">
    </slot>
  </div>
</template>

<script>
export default {
  name: 'dictaphone',
  data() {
    return {
      audioBlob: null,
      mediaRecorder: null,
      isRecording: false,
    };
  },
  methods: {
    startRecording() {
      this.isRecording = true;
      this.mediaRecorder.start();
    },
    stopRecording() {
      this.isRecording = false;
      this.mediaRecorder.stop();
    },
    deleteRecording() {
      this.audioBlob = null;
    },
  },
  watch: {
    audioBlob() {
      this.$emit('stop', {
        blob: this.audioBlob,
        src: URL.createObjectURL(this.audioBlob),
      });
    },
  },
  // eslint-disable-next-line consistent-return
  async mounted() {
    let stream;

    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      this.$emit('error', '`navigator.mediaDevices.getUserMedia()` failed.');
      return Promise.resolve();
    }

    const recorder = new MediaRecorder(stream);
    let chunks = [];

    recorder.addEventListener('stop', () => {
      this.audioBlob = new Blob(chunks, { type: 'audio/webm' });
      chunks = [];
    });

    recorder.addEventListener('dataavailable', (e) => {
      chunks.push(e.data);
    });

    this.mediaRecorder = recorder;
  },
};
</script>
