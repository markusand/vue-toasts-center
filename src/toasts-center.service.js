import { reactive, readonly } from 'vue';

const state = reactive({
  toasts: {},
  options: {
    timeout: undefined,
    closeable: false,
    errorFormat: error => error.message,
  },
});

export const toasts = readonly(state.toasts);

export const configToasts = options => Object.assign(state.options, options);

/* Rely on context hoisting */
/* eslint-disable no-use-before-define */
export const showToast = (message, options = {}) => {
  const id = Math.random().toString(36).substring(2);
  const {
    timeout = state.options.timeout,
    onClose = state.options.onClose,
    closeable = !!onClose || state.options.closeable || state.options.onClose,
    onClick = state.options.onClick,
    clickable = !!onClick || closeable || state.options.onClick,
    ...rest
  } = options;

  const close = () => {
    if (state.toasts[id]) {
      onClose?.(state.toasts[id], context);
      delete state.toasts[id];
    }
  };

  const click = () => {
    onClick?.(state.toasts[id], context);
    if (closeable) close();
  };

  const toast = { ...rest, id, message, clickable, closeable, click, close };

  state.toasts[id] = toast;
  if (timeout) setTimeout(() => toast.close(), timeout);
  return toast;
};

export const errorToast = (msg, options) => showToast(msg, { ...options, type: 'error' });
export const successToast = (msg, options) => showToast(msg, { ...options, type: 'success' });
export const infoToast = (msg, options) => showToast(msg, { ...options, type: 'info' });
export const warningToast = (msg, options) => showToast(msg, { ...options, type: 'warning' });

/* Rely on hoisting */
const context = { showToast, errorToast, successToast, warningToast, infoToast };

export const toastCatcher = (fn, options = {}) => {
  const { format = state.options.errorFormat, silent = true, ...rest } = options;
  return (...attrs) => fn(...attrs).catch(error => {
    const toast = errorToast(format(error), rest);
    if (!silent) throw error;
    return toast;
  });
};
