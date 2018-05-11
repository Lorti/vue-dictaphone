export default {
  name: 'dictaphone',
  data() {
    return {
      audio: null,
      stream: null,
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
      stream: this.stream,
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
  async mounted() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

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
    this.stream = stream;
  },
};
