<template>
  <div>
    <button v-if="!isRecording" @click="startRecording">Start</button>
    <button v-else @click="stopRecording">Stop</button>

    <template v-if="audioSource">
      <audio :src="audioSource" controls></audio>
      <button @click="deleteRecording">Discard</button>
    </template>

    <canvas width="512" height="128"
            :style="{ opacity: isRecording ? 1 : .5 }"
            v-visualize="frequencies"></canvas>
  </div>
</template>

<script>
function initMediaRecorder(stream) {
  const recorder = new MediaRecorder(stream);
  let chunks = [];

  recorder.addEventListener('stop', () => {
    const blob = new Blob(chunks, { type: 'audio/webm' });
    chunks = [];
    this.audioSource = URL.createObjectURL(blob);
  });

  recorder.addEventListener('dataavailable', (e) => {
    chunks.push(e.data);
  });

  this.mediaRecorder = recorder;
}

function initVisualizer(stream) {
  const context = new AudioContext();

  const analyser = context.createAnalyser();
  analyser.fftSize = 2048;
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  const source = context.createMediaStreamSource(stream);
  source.connect(analyser);

  const updateData = () => {
    analyser.getByteTimeDomainData(dataArray);
    this.frequencies = dataArray.slice();

    requestAnimationFrame(updateData);
  };

  updateData();
}

export default {
  name: 'dictaphone',
  data() {
    return {
      isRecording: false,
      audioSource: null,
      frequencies: null,
    };
  },
  methods: {
    startRecording() {
      this.deleteRecording();
      this.isRecording = true;
      this.mediaRecorder.start();
    },
    stopRecording() {
      this.isRecording = false;
      this.mediaRecorder.stop();
    },
    deleteRecording() {
      this.audioSource = null;
    },
  },
  directives: {
    visualize: {
      update(canvasElement, binding) {
        const context = canvasElement.getContext('2d');

        const width = canvasElement.width;
        const height = canvasElement.height;

        context.clearRect(0, 0, width, height);
        context.beginPath();

        const dataLength = binding.value.length;
        const sliceWidth = (width * 1.0) / dataLength;
        let x = 0;

        for (let i = 0; i < dataLength; i += 1) {
          const v = binding.value[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }

          x += sliceWidth;
        }

        context.lineTo(width, height / 2);
        context.stroke();
      },
    },
  },
  mounted() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      initMediaRecorder.call(this, stream);
      initVisualizer.call(this, stream);
    });
  },
};
</script>

<style scoped>
  audio, button, canvas {
    display: block;
    margin: 1rem auto;
    width: 100%;
  }

  audio + button {
    width: auto;
  }
</style>
