/**
 * Easing Tokens - 애니메이션 이징 함수들
 * CSS와 JavaScript/Framer Motion에서 모두 사용 가능
 */

// Easing 타입 정의
export type EasingType = 
  | "standard"
  | "ease_Out" 
  | "ease_Out_Level_1"
  | "ease_In"
  | "ease_InOut" 
  | "ease_Spring"
  | "ease_Spring_Level_1"
  | "ease_Spring_Level_2"
  | "linear";

// CSS Cubic Bezier 값들 (배열 형태)
export const easingValues: Record<EasingType, [number, number, number, number]> = {
  standard: [0.15, 0, 0.15, 1],
  ease_Out: [0.33, 1, 0.68, 1],
  ease_Out_Level_1: [0.25, 1, 0.5, 1],
  ease_In: [0.55, 0.055, 0.675, 0.19],
  ease_InOut: [0.65, 0, 0.35, 1],
  ease_Spring: [0.34, 1.5, 0.54, 1],
  ease_Spring_Level_1: [0.45, 1.8, 0.57, 0.92],
  ease_Spring_Level_2: [0.45, 2.4, 0.68, 0.86],
  linear: [0, 0, 1, 1],
};

// CSS 문자열 형태
export const easingCSSValues: Record<EasingType, string> = {
  standard: "cubic-bezier(0.15, 0, 0.15, 1)",
  ease_Out: "cubic-bezier(0.33, 1, 0.68, 1)",
  ease_Out_Level_1: "cubic-bezier(0.25, 1, 0.5, 1)",
  ease_In: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  ease_InOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  ease_Spring: "cubic-bezier(0.34, 1.5, 0.54, 1)",
  ease_Spring_Level_1: "cubic-bezier(0.45, 1.8, 0.57, 0.92)",
  ease_Spring_Level_2: "cubic-bezier(0.45, 2.4, 0.68, 0.86)",
  linear: "linear",
};

// CSS Custom Property 매핑
export const easingCSSVars: Record<EasingType, string> = {
  standard: "var(--ease-standard)",
  ease_Out: "var(--ease-out-custom)",
  ease_Out_Level_1: "var(--ease-out-level-1)",
  ease_In: "var(--ease-in-custom)",
  ease_InOut: "var(--ease-in-out-custom)",
  ease_Spring: "var(--ease-spring)",
  ease_Spring_Level_1: "var(--ease-spring-level-1)",
  ease_Spring_Level_2: "var(--ease-spring-level-2)",
  linear: "var(--ease-linear)",
};

/**
 * 기존 setEasing 함수 (호환성 유지)
 * @param easing - 이징 타입
 * @returns 큐빅 베지어 값 배열
 */
export const setEasing = (easing: EasingType): [number, number, number, number] => {
  return easingValues[easing] || easingValues.standard;
};

/**
 * CSS 문자열 형태로 이징 값 가져오기
 * @param easing - 이징 타입  
 * @returns CSS cubic-bezier 문자열
 */
export const getEasingCSS = (easing: EasingType): string => {
  return easingCSSValues[easing] || easingCSSValues.standard;
};

/**
 * CSS Custom Property로 이징 값 가져오기
 * @param easing - 이징 타입
 * @returns CSS var() 문자열
 */
export const getEasingVar = (easing: EasingType): string => {
  return easingCSSVars[easing] || easingCSSVars.standard;
};

/**
 * Framer Motion용 이징 객체 생성
 * @param easing - 이징 타입
 * @returns Framer Motion transition 객체
 */
export const createFramerEasing = (easing: EasingType) => {
  return {
    type: "tween",
    ease: easingValues[easing] || easingValues.standard,
  };
};

/**
 * 모든 이징 타입과 설명
 */
export const easingDescriptions: Record<EasingType, { name: string; description: string; useCase: string }> = {
  standard: {
    name: "Standard",
    description: "균형잡힌 표준 이징",
    useCase: "일반적인 UI 애니메이션에 적합"
  },
  ease_Out: {
    name: "Ease Out",
    description: "빠르게 시작해서 천천히 끝남",
    useCase: "요소가 화면에 나타날 때"
  },
  ease_Out_Level_1: {
    name: "Ease Out Level 1",
    description: "부드러운 ease out",
    useCase: "섬세한 페이드 인 효과"
  },
  ease_In: {
    name: "Ease In", 
    description: "천천히 시작해서 빠르게 끝남",
    useCase: "요소가 화면에서 사라질 때"
  },
  ease_InOut: {
    name: "Ease In Out",
    description: "천천히 시작해서 천천히 끝남",
    useCase: "크기 변화나 위치 이동"
  },
  ease_Spring: {
    name: "Spring",
    description: "탄성 있는 스프링 효과",
    useCase: "버튼 클릭이나 인터랙션"
  },
  ease_Spring_Level_1: {
    name: "Spring Level 1",
    description: "강한 스프링 효과",
    useCase: "주목을 끄는 애니메이션"
  },
  ease_Spring_Level_2: {
    name: "Spring Level 2", 
    description: "매우 강한 스프링 효과",
    useCase: "특별한 이벤트나 성공 피드백"
  },
  linear: {
    name: "Linear",
    description: "일정한 속도",
    useCase: "프로그레스 바나 로딩 애니메이션"
  },
};

// 기본 내보내기
export default {
  setEasing,
  getEasingCSS,
  getEasingVar,
  createFramerEasing,
  easingValues,
  easingCSSValues,
  easingCSSVars,
  easingDescriptions,
};