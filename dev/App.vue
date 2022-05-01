<template>
  <section>
    <p>
      <label>
        Timeout (ms)
        <input v-model="options.timeout" type="number" size="10">
      </label>
      <label>
        <input v-model="options.clickable" type="checkbox">
        Clickable
      </label>
      <label>
        <input v-model="options.closeable" type="checkbox">
        Closeable
      </label>
    </p>
    <p>
      <button @click="openToast('Default')">Default</button>
      <button @click="openToast('Sucess!', 'success')">Success</button>
      <button @click="openToast('Error!', 'error')">Error</button>
      <button @click="openToast('Info!', 'info')">Info</button>
      <button @click="openToast('Warning!', 'warning')">Warning</button>
    </p>
    <toasts-center />
  </section>
</template>

<script>
import { inject, reactive } from 'vue';

export default {
  name: 'App',
  setup() {
    const toasts = inject('toasts');
    const options = reactive({});

    const onClick = (toast, context) => {
      context.warningToast(`Toast ${toast.id} clicked`, { closeable: true });
    };
    const onClose = (toast, context) => {
      context.infoToast(`Info: Toast ${toast.id} closed`, { timeout: 1000 });
    };

    const openToast = (message, type) => {
      toasts.showToast(message, { ...options, onClick, onClose, type });
    };

    return { options, openToast };
  },
};
</script>
