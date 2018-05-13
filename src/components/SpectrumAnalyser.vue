<template>
  <canvas :width="width" :height="height"
          v-if="points" v-render="points"></canvas>
</template>

<script>
export default {
  name: 'spectrum-analyser',
  props: {
    width: {
      type: Number,
      default: 512,
    },
    height: {
      type: Number,
      default: 128,
    },
  },
  data() {
    return {
      spectrum: null,
    };
  },
  computed: {
    points() {
      if (!this.spectrum) {
        return null;
      }

      const points = [];

      const dataLength = this.spectrum.length || Object.keys(this.spectrum).length;
      const sliceWidth = (this.width * 1.0) / dataLength;

      let x = 0;
      for (let i = 0; i < dataLength; i += 1) {
        const v = this.spectrum[i] / 128.0;
        const y = v * (this.height / 2);
        points.push([x, y]);
        x += sliceWidth;
      }

      return points;
    },
  },
  directives: {
    render: {
      update(canvasElement, binding) {
        const context = canvasElement.getContext('2d');

        const width = canvasElement.width;
        const height = canvasElement.height;

        context.clearRect(0, 0, width, height);
        context.beginPath();

        for (let i = 0; i < binding.value.length; i += 1) {
          if (i === 0) {
            context.moveTo(...binding.value[i]);
          } else {
            context.lineTo(...binding.value[i]);
          }
        }

        context.lineTo(width, height / 2);
        context.stroke();
      },
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

    const context = new AudioContext();

    const analyser = context.createAnalyser();
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const source = context.createMediaStreamSource(stream);
    source.connect(analyser);

    const updateData = () => {
      analyser.getByteTimeDomainData(dataArray);
      this.spectrum = dataArray.slice();

      requestAnimationFrame(updateData);
    };

    updateData();
  },
};
</script>

<style scoped>
  canvas {
    display: block;
  }
</style>
