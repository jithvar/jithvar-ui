import React from 'react';

// JAlerts Types
export interface JAlertButton {
  text: string;
  onClick?: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost';
  className?: string;
  autoClose?: boolean;
}

export interface JAlertOptions {
  title?: string;
  message?: string;
  html?: string;
  type?: 'success' | 'error' | 'warning' | 'info' | 'question' | 'custom';
  icon?: React.ReactNode | string;
  customIcon?: React.ReactNode;
  showIcon?: boolean;
  
  // Buttons
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string; // Custom color for confirm button (hex, rgb, or CSS color)
  cancelButtonColor?: string;  // Custom color for cancel button (hex, rgb, or CSS color)
  buttons?: JAlertButton[];
  
  // Callbacks
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  onClose?: () => void;
  
  // Styling
  width?: string;
  padding?: string;
  backdrop?: boolean;
  backdropBlur?: boolean;
  customClass?: string;
  iconClass?: string;
  titleClass?: string;
  messageClass?: string;
  
  // Behavior
  timer?: number;
  timerProgressBar?: boolean;
  showCloseButton?: boolean;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  
  // Animations
  animation?: 'fade' | 'slide' | 'zoom' | 'bounce' | 'flip' | 'shake';
  animationDuration?: number;
  
  // Input (for prompts)
  input?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select';
  inputPlaceholder?: string;
  inputValue?: string;
  inputOptions?: Array<{ value: string; label: string }>;
  inputValidator?: (value: string) => string | null;
  
  // Position
  position?: 'center' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';
  
  // Toast mode
  toast?: boolean;
  toastPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export interface JAlertResult {
  isConfirmed: boolean;
  isDismissed: boolean;
  isDenied: boolean;
  value?: any;
}
