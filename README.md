# vue-dictaphone

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.me/manuninja)

🎙️ Vue.js dictaphone component to record audio from the user

---

## Installation 

```
npm install --save vue-dictaphone
```

```
yarn add vue-dictaphone
```

## Usage

```js
import VueDictaphone from "vue-dictaphone";
Vue.use(VueDictaphone);
```

```html
<vue-dictaphone @stop="handleRecording($event)">
  <div slot-scope="{ isRecording, startRecording, stopRecording, stream }">
    <button v-if="!isRecording"
            @click="startRecording">Start recording</button>
    <button v-else
            @click="stopRecording">Stop recording</button>
    <vue-dictaphone-spectrum-analyser :stream="stream"
                       :style="{ opacity: isRecording ? 1 : .5 }"/>
  </div>
</vue-dictaphone>
<template v-if="audioSource">
  <audio :src="audioSource" controls></audio>
</template>
```

```js
new Vue({
  // ... 
  data: {
    audioSource: null
  },
  methods: {
    handleRecording({ blob, src }) {
      this.audioSource = src;
    }
  }
  // ... 
});
```

## Author

Manuel Wieser
<https://manu.ninja/>
<https://twitter.com/manuelwieser>
<https://www.paypal.me/manuninja>
