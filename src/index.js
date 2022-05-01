// Library entry point
import * as ToastsService from './toasts-center.service';
import ToastsCenter from './ToastsCenter.vue';

const {
  toasts,
  showToast,
  errorToast,
  successToast,
  infoToast,
  warningToast,
  configToasts,
} = ToastsService;

export { ToastsCenter, toasts, showToast, errorToast, successToast, infoToast, warningToast };

export default {
  install: (app, options = {}) => {
    configToasts(options);
    app.component(ToastsCenter.name, ToastsCenter);
    app.provide('toasts', ToastsService);
  },
};
