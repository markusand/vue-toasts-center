<template>
  <ul class="toasts-center">
    <li
      v-for="(toast, id) in toasts"
      :key="id"
      :data-toast="id"
      :class="classes(toast)"
      @click="toast.click">
      <slot :toast="toast">
        {{ toast.message }}
      </slot>
    </li>
  </ul>
</template>

<script>
import { toasts } from './toasts-center.service';

export default {
  name: 'ToastsCenter',
  setup() {
    const classes = toast => ['toast', `toast--${toast.type}`, {
      'toast--clickable': toast.clickable,
      'toast--closeable': toast.closeable,
    }];

    return { toasts, classes };
  },
};
</script>

<style>
.toasts-center {
  list-style: none;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 5;
  margin: 0;
  padding: 0.5em;
  min-width: 300px;
}

.toasts-center .toast {
  background: #bbb;
  color: #fff;
  padding: 0.5em 1em;
  margin: 2px;
  display: flex;
  align-items: center;
}

.toasts-center .toast--error { background: #f65; }
.toasts-center .toast--success { background: #7c7; }
.toasts-center .toast--info { background: #5be; }
.toasts-center .toast--warning { background: #fc6; }

.toasts-center .toast--clickable { cursor: pointer; }
.toasts-center .toast--closeable::after {
  content: '\00D7';
  margin-left: auto;
  padding-left: 1em;
}
</style>
