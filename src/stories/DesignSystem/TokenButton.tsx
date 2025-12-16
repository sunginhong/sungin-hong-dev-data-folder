import React from 'react';
import '../../styles/storiesStyle.css';

export interface TokenButtonProps {
  /** 버튼 변형 타입 */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /** 버튼 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 버튼 텍스트 */
  children: React.ReactNode;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 비활성화 여부 */
  disabled?: boolean;
}

const TokenButton: React.FC<TokenButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled = false,
}) => {
  const getButtonClasses = () => {
    const baseClasses = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClasses = {
      small: 'text-xs p-2',
      medium: 'text-sm p-3',
      large: 'text-base p-4'
    };
    
    return `${baseClasses} ${variantClass} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  };

  const buttonStyle = {
    // 토큰을 직접 사용한 예시
    '--btn-padding': variant === 'primary' ? 'var(--spacing-4)' : 'var(--spacing-3)',
    fontFamily: 'var(--font-family-sans)',
    transition: 'var(--transition-colors)',
  } as React.CSSStyle;

  return (
    <button
      className={getButtonClasses()}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default TokenButton;