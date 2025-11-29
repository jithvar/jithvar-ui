import React, { useState, useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { JAlertOptions, JAlertResult } from '../../../types/alerts';

interface JAlertComponentProps extends Omit<JAlertOptions, 'onClose'> {
  onClose: (result: JAlertResult) => void;
}

const JAlertComponent: React.FC<JAlertComponentProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState(props.inputValue || '');
  const [inputError, setInputError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setIsVisible(true), 10);

    // Auto close timer
    if (props.timer) {
      const startTime = Date.now();
      const duration = props.timer;

      if (props.timerProgressBar) {
        progressIntervalRef.current = window.setInterval(() => {
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
          setProgress(remaining);
        }, 10);
      }

      timerRef.current = window.setTimeout(() => {
        handleClose({ isConfirmed: false, isDismissed: true, isDenied: false });
      }, duration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const handleClose = (result: JAlertResult) => {
    setIsVisible(false);
    setTimeout(() => {
      props.onClose(result);
    }, 300); // Wait for animation to complete
  };

  const handleConfirm = async () => {
    // Validate input if present
    if (props.input && props.inputValidator) {
      const error = props.inputValidator(inputValue);
      if (error) {
        setInputError(error);
        return;
      }
    }

    setIsLoading(true);

    try {
      if (props.onConfirm) {
        await props.onConfirm();
      }
      handleClose({ isConfirmed: true, isDismissed: false, isDenied: false, value: inputValue });
    } catch (error) {
      console.error('Confirm action failed:', error);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (props.onCancel) {
      props.onCancel();
    }
    handleClose({ isConfirmed: false, isDismissed: false, isDenied: true });
  };

  const handleBackdropClick = () => {
    // Only close on outside click if explicitly allowed
    if (props.allowOutsideClick === true) {
      handleClose({ isConfirmed: false, isDismissed: true, isDenied: false });
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      // Only close on Escape if explicitly allowed
      if (e.key === 'Escape' && props.allowEscapeKey === true) {
        handleClose({ isConfirmed: false, isDismissed: true, isDenied: false });
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const getIcon = () => {
    if (props.customIcon) return props.customIcon;
    if (!props.showIcon) return null;

    // Determine icon background color based on confirmButtonColor or type
    const getIconBackground = () => {
      if (props.confirmButtonColor) {
        // Extract base color from custom color and create gradient
        return props.confirmButtonColor;
      }
      const backgrounds: Record<string, string> = {
        success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        info: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        question: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      };
      return backgrounds[props.type || 'info'];
    };

    const getIconShadow = () => {
      if (props.confirmButtonColor) {
        // Generate shadow based on custom color
        return `0 10px 40px ${props.confirmButtonColor}40`;
      }
      const shadows: Record<string, string> = {
        success: '0 10px 40px rgba(16, 185, 129, 0.3)',
        error: '0 10px 40px rgba(239, 68, 68, 0.3)',
        warning: '0 10px 40px rgba(245, 158, 11, 0.3)',
        info: '0 10px 40px rgba(59, 130, 246, 0.3)',
        question: '0 10px 40px rgba(139, 92, 246, 0.3)',
      };
      return shadows[props.type || 'info'];
    };

    const iconMap = {
      success: (
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 24px',
          borderRadius: '50%',
          background: getIconBackground(),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: getIconShadow(),
          animation: 'bounceIn 0.6s ease-out'
        }}>
          <svg style={{ width: '48px', height: '48px', color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
              style={{
                strokeDasharray: 100,
                strokeDashoffset: 100,
                animation: 'checkDraw 0.5s ease-out 0.3s forwards'
              }}
            />
          </svg>
        </div>
      ),
      error: (
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 24px',
          borderRadius: '50%',
          background: getIconBackground(),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: getIconShadow(),
          animation: 'bounceIn 0.6s ease-out'
        }}>
          <svg style={{ width: '48px', height: '48px', color: '#ffffff', animation: 'rotate 0.5s ease-out 0.3s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M6 18L18 6"
              style={{
                strokeDasharray: 100,
                strokeDashoffset: 100,
                animation: 'xDraw 0.3s ease-out 0.3s forwards'
              }}
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M6 6l12 12"
              style={{
                strokeDasharray: 100,
                strokeDashoffset: 100,
                animation: 'xDraw 0.3s ease-out 0.5s forwards'
              }}
            />
          </svg>
        </div>
      ),
      warning: (
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 24px',
          borderRadius: '50%',
          background: getIconBackground(),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: getIconShadow(),
          animation: 'bounceIn 0.6s ease-out'
        }}>
          <svg style={{ width: '48px', height: '48px', color: '#ffffff', animation: 'warningPulse 2s ease-in-out infinite' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              style={{
                animation: 'scaleIn 0.5s ease-out 0.3s backwards'
              }}
            />
          </svg>
        </div>
      ),
      info: (
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 24px',
          borderRadius: '50%',
          background: getIconBackground(),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: getIconShadow(),
          animation: 'bounceIn 0.6s ease-out'
        }}>
          <svg style={{ width: '48px', height: '48px', color: '#ffffff', animation: 'infoPulse 2s ease-in-out infinite' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="9"
              strokeWidth={3}
              style={{
                strokeDasharray: 60,
                strokeDashoffset: 60,
                animation: 'circleDraw 0.6s ease-out 0.3s forwards'
              }}
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M13 16h-1v-4h-1m1-4h.01"
              style={{
                strokeDasharray: 20,
                strokeDashoffset: 20,
                animation: 'pathDraw 0.4s ease-out 0.7s forwards'
              }}
            />
          </svg>
        </div>
      ),
      question: (
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 24px',
          borderRadius: '50%',
          background: getIconBackground(),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: getIconShadow(),
          animation: 'bounceIn 0.6s ease-out'
        }}>
          <svg style={{ width: '48px', height: '48px', color: '#ffffff', animation: 'questionBounce 1.5s ease-in-out infinite' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="9"
              strokeWidth={3}
              style={{
                strokeDasharray: 60,
                strokeDashoffset: 60,
                animation: 'circleDraw 0.6s ease-out 0.3s forwards'
              }}
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01"
              style={{
                strokeDasharray: 40,
                strokeDashoffset: 40,
                animation: 'pathDraw 0.5s ease-out 0.7s forwards'
              }}
            />
          </svg>
        </div>
      ),
      custom: null,
    };

    return iconMap[props.type || 'info'];
  };

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0 scale-95';

    const animationMap = {
      fade: 'animate-fade-in',
      slide: 'animate-slide-in',
      zoom: 'animate-zoom-in',
      bounce: 'animate-bounce-in',
      flip: 'animate-flip-in',
      shake: 'animate-shake',
    };

    return animationMap[props.animation || 'zoom'];
  };

  const getPositionClass = () => {
    if (props.toast) {
      const toastPosMap = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'top-center': 'top-4 left-1/2 -translate-x-1/2',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
      };
      return toastPosMap[props.toastPosition || 'top-right'];
    }

    const positionMap = {
      center: 'items-center justify-center',
      top: 'items-start justify-center pt-20',
      'top-start': 'items-start justify-start p-4',
      'top-end': 'items-start justify-end p-4',
      bottom: 'items-end justify-center pb-20',
      'bottom-start': 'items-end justify-start p-4',
      'bottom-end': 'items-end justify-end p-4',
    };

    return positionMap[props.position || 'center'];
  };

  const renderInput = () => {
    if (!props.input) return null;

    const inputStyle: React.CSSProperties = {
      width: '100%',
      padding: '12px 16px',
      border: inputError ? '2px solid #ef4444' : '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '15px',
      color: '#1f2937',
      backgroundColor: '#ffffff',
      outline: 'none',
      transition: 'all 0.2s ease',
    };

    if (props.input === 'textarea') {
      return (
        <textarea
          style={inputStyle}
          placeholder={props.inputPlaceholder}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setInputError(null);
          }}
          rows={4}
          autoFocus
          onFocus={(e) => {
            e.target.style.border = '2px solid #3b82f6';
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.border = inputError ? '2px solid #ef4444' : '2px solid #e5e7eb';
            e.target.style.boxShadow = 'none';
          }}
        />
      );
    }

    if (props.input === 'select') {
      return (
        <select
          style={inputStyle}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setInputError(null);
          }}
          autoFocus
          onFocus={(e) => {
            e.target.style.border = '2px solid #3b82f6';
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.border = inputError ? '2px solid #ef4444' : '2px solid #e5e7eb';
            e.target.style.boxShadow = 'none';
          }}
        >
          <option value="">Select an option...</option>
          {props.inputOptions?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={props.input}
        style={inputStyle}
        placeholder={props.inputPlaceholder}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setInputError(null);
        }}
        autoFocus
        onFocus={(e) => {
          e.target.style.border = '2px solid #3b82f6';
          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.border = inputError ? '2px solid #ef4444' : '2px solid #e5e7eb';
          e.target.style.boxShadow = 'none';
        }}
      />
    );
  };

  const getTypeColor = () => {
    const colors: Record<string, string> = {
      success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      info: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      question: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    };
    return colors[props.type || 'info'];
  };

  const getTypeBorderColor = () => {
    const colors: Record<string, string> = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
      question: '#8b5cf6',
    };
    return colors[props.type || 'info'];
  };

  const getButtonStyle = (variant?: string, isConfirmButton = false): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      padding: '12px 32px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '15px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      minWidth: '100px',
    };

    // If it's the confirm button with custom color
    if (isConfirmButton && props.confirmButtonColor) {
      return { 
        ...baseStyle, 
        background: props.confirmButtonColor, 
        color: '#ffffff',
        boxShadow: `0 2px 8px ${props.confirmButtonColor}40`
      };
    }

    // If it's the cancel button with custom color
    if (!isConfirmButton && props.cancelButtonColor) {
      return { 
        ...baseStyle, 
        background: props.cancelButtonColor, 
        color: '#ffffff',
        boxShadow: `0 2px 8px ${props.cancelButtonColor}40`
      };
    }

    // If it's the confirm button and no custom variant, use the alert type color
    if (isConfirmButton && !variant) {
      return { ...baseStyle, background: getTypeColor(), color: '#ffffff' };
    }

    switch (variant) {
      case 'danger':
        return { ...baseStyle, background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: '#ffffff' };
      case 'secondary':
        return { ...baseStyle, background: '#f3f4f6', color: '#374151', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' };
      case 'success':
        return { ...baseStyle, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff' };
      case 'warning':
        return { ...baseStyle, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#ffffff' };
      case 'ghost':
        return { ...baseStyle, background: 'transparent', color: '#6b7280', boxShadow: 'none', border: '2px solid #e5e7eb' };
      default:
        return { ...baseStyle, background: getTypeColor(), color: '#ffffff' };
    }
  };

  const renderButtons = () => {
    if (props.buttons && props.buttons.length > 0) {
      return (
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
          {props.buttons.map((button, index) => (
            <button
              key={index}
              onClick={async () => {
                if (button.onClick) {
                  setIsLoading(true);
                  await button.onClick();
                  setIsLoading(false);
                }
                if (button.autoClose !== false) {
                  handleClose({ isConfirmed: true, isDismissed: false, isDenied: false, value: inputValue });
                }
              }}
              style={getButtonStyle(button.variant)}
              disabled={isLoading}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              }}
            >
              {button.text}
            </button>
          ))}
        </div>
      );
    }

    const showConfirm = props.showConfirmButton !== false;
    const showCancel = props.showCancelButton;

    if (!showConfirm && !showCancel) return null;

    return (
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
        {showCancel && (
          <button
            onClick={handleCancel}
            style={getButtonStyle(props.cancelButtonColor ? undefined : 'secondary', false)}
            disabled={isLoading}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              if (props.cancelButtonColor) {
                e.currentTarget.style.boxShadow = `0 4px 12px ${props.cancelButtonColor}60`;
              } else {
                e.currentTarget.style.background = '#e5e7eb';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              if (props.cancelButtonColor) {
                e.currentTarget.style.boxShadow = `0 2px 8px ${props.cancelButtonColor}40`;
              } else {
                e.currentTarget.style.background = '#f3f4f6';
              }
            }}
          >
            {props.cancelButtonText || 'Cancel'}
          </button>
        )}
        {showConfirm && (
          <button
            onClick={handleConfirm}
            style={{
              ...getButtonStyle(undefined, true),
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            disabled={isLoading}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }}
          >
            {isLoading && (
              <svg style={{ animation: 'spin 1s linear infinite', width: '20px', height: '20px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {props.confirmButtonText || 'OK'}
          </button>
        )}
      </div>
    );
  };

  const getToastPosition = (): React.CSSProperties => {
    const posMap: Record<string, React.CSSProperties> = {
      'top-right': { top: '20px', right: '20px' },
      'top-left': { top: '20px', left: '20px' },
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      'top-center': { top: '20px', left: '50%', transform: 'translateX(-50%)' },
      'bottom-center': { bottom: '20px', left: '50%', transform: 'translateX(-50%)' },
    };
    return posMap[props.toastPosition || 'top-right'];
  };

  const getModalPosition = (): React.CSSProperties => {
    const posMap: Record<string, React.CSSProperties> = {
      center: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
      top: { display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '80px' },
      'top-start': { display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', padding: '20px' },
      'top-end': { display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', padding: '20px' },
      bottom: { display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '80px' },
      'bottom-start': { display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', padding: '20px' },
      'bottom-end': { display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '20px' },
    };
    return posMap[props.position || 'center'];
  };

  if (props.toast) {
    return (
      <div style={{
        position: 'fixed',
        ...getToastPosition(),
        zIndex: 9999,
        pointerEvents: 'none',
      }}>
        <div
          style={{
            pointerEvents: 'auto',
            background: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            maxWidth: '420px',
            width: props.width || '420px',
            animation: isVisible ? 'slideInRight 0.3s ease-out' : 'fadeOut 0.3s ease-out',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            overflowY: "hidden",
            overflowX: "hidden",
            position: "relative"
            // borderTop: `4px solid ${getTypeBorderColor()}`,
          }}
        >
          {/* Animated top border */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '4px',
            width: '100%',
            background: getTypeColor(),
            animation: 'toastBorderSlide 0.8s ease-out',
            transformOrigin: 'left',
          }} />

          {props.timerProgressBar && (
            <div style={{ height: '4px', background: '#e5e7eb' }}>
              <div
                style={{
                  height: '100%',
                  background: getTypeColor(),
                  transition: 'width 0.1s linear',
                  width: `${progress}%`,
                }}
              />
            </div>
          )}
          <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {props.showIcon !== false && (
              <div style={{ flexShrink: 0 }}>
                {(() => {
                  const iconColors = {
                    success: '#10b981',
                    error: '#ef4444',
                    warning: '#f59e0b',
                    info: '#3b82f6',
                    question: '#8b5cf6',
                    custom: '#6b7280',
                  };
                  const color = iconColors[props.type || 'info'];
                  return (
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: `${color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{ width: '24px', height: '24px', color }}>
                        {props.type === 'success' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {props.type === 'error' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        {props.type === 'warning' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        )}
                        {(props.type === 'info' || !props.type) && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {props.type === 'question' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
            <div style={{ flex: 1 }}>
              {props.title && <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '15px', margin: 0 }}>{props.title}</h3>}
              {props.message && <p style={{ fontSize: '14px', color: '#6b7280', margin: props.title ? '4px 0 0 0' : 0 }}>{props.message}</p>}
            </div>
            <button
              onClick={() => handleClose({ isConfirmed: false, isDismissed: true, isDenied: false })}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#9ca3af',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#6b7280'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              title="Close"
            >
              <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      ...getModalPosition(),
    }}>
      {/* Backdrop */}
      {props.backdrop !== false && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: props.backdropBlur ? 'blur(8px)' : 'none',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          onClick={handleBackdropClick}
        />
      )}

      {/* Alert Modal */}
      <div
        style={{
          position: 'relative',
          background: '#ffffff',
          borderRadius: '20px',
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`,
          overflow: 'visible',
          width: props.width || '500px',
          maxWidth: '90vw',
          padding: props.padding || '48px',
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowY: "hidden",
          overflowX: "hidden",
        }}
      >

        {/* Close button */}
        {props.showCloseButton && (
          <button
            onClick={() => handleClose({ isConfirmed: false, isDismissed: true, isDenied: false })}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#9ca3af',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#6b7280'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
          >
            <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Progress bar */}
        {props.timerProgressBar && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#e5e7eb', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
            <div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
                transition: 'width 0.1s linear',
                width: `${progress}%`,
                borderTopLeftRadius: '16px',
              }}
            />
          </div>
        )}

        {/* Icon */}
        {props.showIcon !== false && getIcon()}

        {/* Title */}
        {props.title && (
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#111827',
            marginBottom: '12px',
            lineHeight: 1.3,
          }}>
            {props.title}
          </h2>
        )}

        {/* Message */}
        {props.message && (
          <p style={{
            textAlign: 'center',
            color: '#6b7280',
            marginBottom: '16px',
            fontSize: '15px',
            lineHeight: 1.6,
          }}>
            {props.message}
          </p>
        )}

        {/* HTML Content */}
        {props.html && (
          <div
            style={{
              textAlign: 'center',
              color: '#6b7280',
              marginBottom: '16px',
              fontSize: '15px',
              lineHeight: 1.6,
            }}
            dangerouslySetInnerHTML={{ __html: props.html }}
          />
        )}

        {/* Input */}
        {props.input && (
          <div style={{ marginTop: '16px' }}>
            {renderInput()}
            {inputError && (
              <p style={{
                color: '#ef4444',
                fontSize: '14px',
                marginTop: '8px',
                textAlign: 'left',
              }}>
                {inputError}
              </p>
            )}
          </div>
        )}

        {/* Buttons */}
        {renderButtons()}
      </div>
    </div>
  );
};

export default JAlertComponent;
