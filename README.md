# Vue Toasts Center

Show notification toasts with messages for the user.

## Setup

Install from npm

```bash
npm install vue-toasts-center
```

## Usage

Include basic styles in your project js or (s)css entry point

```js
import 'vue-toasts-center/dist/style.css'
```

Install as plugin and use injected methods

```js
/* main.js */
import { createApp } from 'vue';
import App from './App.vue';
import Toasts from 'vue-toasts-center';

const app = createApp(App);
app.use(Toasts, {
  timeout: 5000,
  closeable: true,
});
app.mount('#app');

/* App.vue */
<template>
  <toasts-center />
</template>

<script>
import { inject } from 'vue';

export default {
  setup() {
    const toasts = inject('toasts');
    toasts.showToast('Hello World!');
  },
};
</script>
```

Or import component and methods locally

```html
<template>
  <section>
    <!-- Trigger the toast -->
    <button @click="errorToast('Error!')">Error toast</button>

    <!-- Add the Toasts Center -->
    <tasks-wait />
  </section>
</template>

<script>
import { ToastsCenter, errorToast } from 'vue-toasts-center';

export default {
  name: 'App',
  components: { ToastsCenter },
  setup() {
    return { errorToast };
  },
};
```

## Methods

### showToast(message, options?)

Show a toast with the given message. Optional options object can be passed to customize the toast behaviour.

```js
showToast('Hello World!', {
  type: 'success',
  timeout: 5000,
  closeable: true,
  onClick: (toast, { showToast }) => showToast(`Toast ${toast.id} clicked!`),
  onClose: (toast, { errorToast }) => errorToast(`Toast ${toast.id} closed`),
});
```

`successToast`, `errorToast`, `infoToast`, `warningToast` shortcuts methods to style different types of toasts without need to define the `type` attribute.
