export default {
  name: 'dictaphone',
  data() {
    return {
      audio: null,
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
      this.audio = null;
    },
  },
  render() {
    return this.$scopedSlots.default({
      isRecording: this.isRecording,
      startRecording: this.startRecording,
      stopRecording: this.stopRecording,
      deleteRecording: this.deleteRecording,
    });
  },
  watch: {
    audio() {
      this.$emit('stop', {
        blob: this.audio,
        src: URL.createObjectURL(this.audio),
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
      this.audio = new Blob(chunks, { type: 'audio/webm' });
      chunks = [];
    });

    recorder.addEventListener('dataavailable', (e) => {
      chunks.push(e.data);
    });

    this.mediaRecorder = recorder;
  },
};
