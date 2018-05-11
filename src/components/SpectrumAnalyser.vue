<template>
  <canvas :width="width" :height="height" v-visualize="spectrum"></canvas>
</template>

<script>
export default {
  name: 'spectrum-analyser',
  props: {
    stream: {
      validator(value) {
        return value instanceof MediaStream;
      },
    },
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
          const y = v * (height / 2);

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
  async mounted() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

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
