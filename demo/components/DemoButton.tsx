import React from 'react';

interface DemoButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary' | 'purple';
  fullWidth?: boolean;
}

export const DemoButton: React.FC<DemoButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary',
  fullWidth = false 
}) => {
  const colors: Record<string, { bg: string; hover: string }> = {
    success: { bg: '#10b981', hover: '#059669' },
    error: { bg: '#ef4444', hover: '#dc2626' },
    warning: { bg: '#f59e0b', hover: '#d97706' },
    info: { bg: '#3b82f6', hover: '#2563eb' },
    primary: { bg: '#6366f1', hover: '#4f46e5' },
    secondary: { bg: '#6b7280', hover: '#4b5563' },
    purple: { bg: '#8b5cf6', hover: '#7c3aed' },
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const style: React.CSSProperties = {
    padding: '12px 24px',
    background: isHovered ? colors[variant].hover : colors[variant].bg,
    color: '#ffffff',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    boxShadow: isHovered 
      ? '0 4px 12px rgba(0, 0, 0, 0.15)' 
      : '0 2px 8px rgba(0, 0, 0, 0.1)',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    width: fullWidth ? '100%' : 'auto',
  };

  return (
    <button
      onClick={onClick}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};
