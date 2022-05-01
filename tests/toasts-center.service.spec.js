/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-absolute-path */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  toasts,
  showToast,
  errorToast,
  successToast,
  infoToast,
  warningToast,
  toastCatcher,
} from '/@/toasts-center.service';

const wait = ms => new Promise(resolve => { setTimeout(resolve, ms); });

describe('ToastsCenter service', () => {
  beforeEach(() => Object.values(toasts).forEach(toast => toast.close()));

  it('should display and close toast', () => {
    const toast = showToast('Hello world!');
    expect(toast).toHaveProperty('message', 'Hello world!');
    expect(toasts).toHaveProperty(toast.id);
  });

  it('should display a toast and close it on click', () => {
    const toast = showToast('Hello World!', { closeable: true });
    expect(toast).toHaveProperty('click');
    toast.click();
    expect(toasts).not.toHaveProperty(toast.id);
  });

  it('should display a toast and trigger onClick callback', () => {
    const toast = showToast('Hello world!', {
      onClick: (_toast, context) => {
        expect(context).toHaveProperty('showToast');
        expect(_toast.id).toBe(toast.id);
      },
    });
    expect(toast).toHaveProperty('click');
    toast.click();
  });

  it('should display a toast and trigger onClose callback', () => {
    const toast = showToast('Hello world!', {
      onClose: (_toast, context) => {
        expect(context).toHaveProperty('showToast');
        expect(_toast.id).toBe(toast.id);
      },
    });
    toast.close();
  });

  it('should display a toast and close close it after a timeout', async () => {
    const toast = showToast('Hello world!', { timeout: 5 });
    expect(toasts).toHaveProperty(toast.id);
    await wait(5);
    expect(toasts).not.toHaveProperty(toast.id);
  });

  it('should display all shorthand toasts', () => {
    const error = errorToast('Error!');
    expect(error).toHaveProperty('type', 'error');
    const success = successToast('Hooray!');
    expect(success).toHaveProperty('type', 'success');
    const info = infoToast('Important notice!');
    expect(info).toHaveProperty('type', 'info');
    const warning = warningToast('Be aware!');
    expect(warning).toHaveProperty('type', 'warning');
  });

  it('should display error toast on catching function rejection', async () => {
    const task = toastCatcher(async () => {
      throw new Error('Something went wrong!');
    });
    const toast = await task();
    expect(toast).toHaveProperty('message', 'Something went wrong!');
    expect(toast).toHaveProperty('type', 'error');
  });

  it('should display error and propagate error of catched fuction', async () => {
    const task = toastCatcher(async () => {
      throw new Error('Something went wrong!');
    }, { silent: false });
    await expect(task()).rejects.toThrow('Something went wrong!');
    expect(Object.keys(toasts)).toHaveLength(1);
    expect(Object.values(toasts)[0]).toHaveProperty('message', 'Something went wrong!');
  });

  it('should format error message of catched function', async () => {
    const task = toastCatcher(async () => {
      throw new Error('Something went wrong!');
    }, { format: error => `Error! ${error.message}` });
    const toast = await task();
    expect(toast).toHaveProperty('message', 'Error! Something went wrong!');
  });
});
