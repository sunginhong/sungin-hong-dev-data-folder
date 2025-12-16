import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { setEasing, getEasingCSS, createFramerEasing, type EasingType } from '../../../../../../../styles/easing-tokens';
import '../../../../../../../styles/storiesStyle.css';

interface BallProps {
  easing: EasingType;
  color?: string;
  size?: number;
  delay?: number;
}

const Ball: React.FC<BallProps> = ({ 
  easing, 
  color = 'var(--color-primary-500)', 
  size = 60,
  delay = 0 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  // 토큰화된 이징 함수 사용
  const easingArray = setEasing(easing);
  const easingCSS = getEasingCSS(easing);
  const framerEasing = createFramerEasing(easing);

  return (
    <div 
      className="card"
      style={{ 
        width: '300px',
        cursor: 'pointer',
        padding: 'var(--spacing-4)'
      }}
      onClick={triggerAnimation}
    >
      <h4 className="font-semibold text-base" style={{ margin: '0 0 var(--spacing-2)' }}>
        {easing.replace(/_/g, ' ')}
      </h4>
      
      {/* CSS Transition 예시 */}
      <div 
        style={{
          height: '80px',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          position: 'relative',
          marginBottom: 'var(--spacing-3)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: 'var(--radius-full)',
            position: 'absolute',
            top: '10px',
            left: isAnimating ? `calc(100% - ${size + 10}px)` : '10px',
            transition: `left 1.5s ${easingCSS}`,
          }}
        />
      </div>

      {/* Framer Motion 예시 */}
      <div 
        style={{
          height: '80px',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
          position: 'relative',
          marginBottom: 'var(--spacing-3)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <motion.div
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: 'var(--radius-full)',
            position: 'absolute',
            top: '10px',
          }}
          animate={{
            left: isAnimating ? `calc(100% - ${size + 10}px)` : '10px'
          }}
          transition={{
            duration: 1.5,
            delay: delay,
            ...framerEasing
          }}
        />
      </div>

      {/* 토큰 정보 */}
      <div style={{ 
        fontFamily: 'var(--font-family-mono)', 
        fontSize: 'var(--font-size-xs)', 
        color: 'var(--text-tertiary)',
        lineHeight: 'var(--line-height-tight)'
      }}>
        <div><strong>Array:</strong> [{easingArray.join(', ')}]</div>
        <div><strong>CSS:</strong> {easingCSS}</div>
      </div>
    </div>
  );
};

interface BallsProps {
  showAllEasings?: boolean;
}

export const Balls: React.FC<BallsProps> = ({ showAllEasings = false }) => {
  const easingTypes: EasingType[] = [
    'standard',
    'ease_Out',
    'ease_Out_Level_1', 
    'ease_In',
    'ease_InOut',
    'ease_Spring',
    'ease_Spring_Level_1',
    'ease_Spring_Level_2',
    'linear'
  ];

  const colors = [
    'var(--color-primary-500)',
    'var(--color-success-500)',
    'var(--color-warning-500)',
    'var(--color-error-500)',
    'var(--color-secondary-500)',
    'var(--color-primary-700)',
    'var(--color-success-700)',
    'var(--color-warning-700)',
    'var(--color-error-700)',
  ];

  if (showAllEasings) {
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: 'var(--spacing-4)',
        padding: 'var(--spacing-4)'
      }}>
        {easingTypes.map((easing, index) => (
          <Ball 
            key={easing}
            easing={easing} 
            color={colors[index]}
            delay={index * 0.1}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 'var(--spacing-4)',
      padding: 'var(--spacing-4)'
    }}>
      <h2 className="text-2xl font-bold text-center">
        🎾 Easing Balls Demo
      </h2>
      <p className="text-secondary text-center" style={{ maxWidth: '500px' }}>
        클릭해서 각 이징 함수의 애니메이션을 확인해보세요. 
        위는 CSS transition, 아래는 Framer Motion으로 구현되었습니다.
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: 'var(--spacing-4)',
        width: '100%',
        maxWidth: '1200px'
      }}>
        <Ball easing="standard" color={colors[0]} />
        <Ball easing="ease_Spring" color={colors[5]} />
        <Ball easing="ease_Out" color={colors[1]} />
      </div>
    </div>
  );
};

export default Balls;