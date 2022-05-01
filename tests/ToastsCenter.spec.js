/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-absolute-path */
import { describe, it, beforeEach } from 'vitest';
import { render, waitForElementToBeRemoved, fireEvent } from '@testing-library/vue';
import { ToastsCenter, toasts, showToast } from '../src';

describe('ToastsCenter component', () => {
  beforeEach(() => Object.values(toasts).forEach(toast => toast.close()));

  it('should display a toast', async () => {
    const { findByText } = render(ToastsCenter);
    showToast('Hello World!');
    await findByText('Hello World!');
  });

  it('should close a toast after timeout', async () => {
    const { findByText } = render(ToastsCenter);
    showToast('Hello World!', { timeout: 100 });
    const toast = await findByText('Hello World!');
    await waitForElementToBeRemoved(toast);
  });

  it('should close a toast after click', async () => {
    const { findByText } = render(ToastsCenter);
    showToast('Hello World!', { closeable: true });
    const toast = await findByText('Hello World!');
    fireEvent.click(toast);
    await waitForElementToBeRemoved(toast);
  });
});
