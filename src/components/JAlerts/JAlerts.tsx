import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import JAlertComponent from './JAlertComponent';
import { JAlertOptions, JAlertResult } from '../../types/alerts';

class JAlerts {
  private static container: HTMLDivElement | null = null;
  private static root: Root | null = null;

  private static getContainer(): HTMLDivElement {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'jalerts-container';
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  private static show(options: JAlertOptions): Promise<JAlertResult> {
    return new Promise((resolve) => {
      const container = this.getContainer();

      const handleClose = (result: JAlertResult) => {
        if (options.onClose) {
          options.onClose();
        }

        // Clean up
        setTimeout(() => {
          if (this.root) {
            this.root.unmount();
            this.root = null;
          }
          if (this.container) {
            this.container.remove();
            this.container = null;
          }
        }, 100);

        resolve(result);
      };

      this.root = createRoot(container);
      this.root.render(
        <JAlertComponent
          {...options}
          onClose={handleClose}
        />
      );
    });
  }

  /**
   * Show a success alert
   */
  static success(options: string | Omit<JAlertOptions, 'type'>): Promise<JAlertResult> {
    const opts = typeof options === 'string'
      ? { message: options, type: 'success' as const }
      : { ...options, type: 'success' as const };
    
    return this.show(opts);
  }

  /**
   * Show an error alert
   */
  static error(options: string | Omit<JAlertOptions, 'type'>): Promise<JAlertResult> {
    const opts = typeof options === 'string'
      ? { message: options, type: 'error' as const }
      : { ...options, type: 'error' as const };
    
    return this.show(opts);
  }

  /**
   * Show a warning alert
   */
  static warning(options: string | Omit<JAlertOptions, 'type'>): Promise<JAlertResult> {
    const opts = typeof options === 'string'
      ? { message: options, type: 'warning' as const }
      : { ...options, type: 'warning' as const };
    
    return this.show(opts);
  }

  /**
   * Show an info alert
   */
  static info(options: string | Omit<JAlertOptions, 'type'>): Promise<JAlertResult> {
    const opts = typeof options === 'string'
      ? { message: options, type: 'info' as const }
      : { ...options, type: 'info' as const };
    
    return this.show(opts);
  }

  /**
   * Show a question/confirmation alert
   */
  static question(options: string | Omit<JAlertOptions, 'type'>): Promise<JAlertResult> {
    const opts = typeof options === 'string'
      ? { message: options, type: 'question' as const, showCancelButton: true }
      : { ...options, type: 'question' as const, showCancelButton: true };
    
    return this.show(opts);
  }

  /**
   * Show a confirmation dialog
   */
  static confirm(options: string | Omit<JAlertOptions, 'type'>): Promise<JAlertResult> {
    const opts = typeof options === 'string'
      ? { 
          message: options, 
          type: 'question' as const,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }
      : { 
          ...options, 
          type: 'question' as const,
          showCancelButton: true 
        };
    
    return this.show(opts);
  }

  /**
   * Show a toast notification
   */
  static toast(options: string | Omit<JAlertOptions, 'toast'>): Promise<JAlertResult> {
    const opts = typeof options === 'string'
      ? { 
          message: options, 
          toast: true,
          timer: 3000,
          showConfirmButton: false,
          type: 'info' as const
        }
      : { 
          ...options, 
          toast: true,
          timer: options.timer || 3000,
          showConfirmButton: false
        };
    
    return this.show(opts);
  }

  /**
   * Show an input prompt
   */
  static prompt(options: Omit<JAlertOptions, 'input'> & { input: JAlertOptions['input'] }): Promise<JAlertResult> {
    return this.show({
      ...options,
      showCancelButton: true,
    });
  }

  /**
   * Show a custom alert
   */
  static custom(options: JAlertOptions): Promise<JAlertResult> {
    return this.show(options);
  }

  /**
   * Close the current alert
   */
  static close(): void {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}

export default JAlerts;
