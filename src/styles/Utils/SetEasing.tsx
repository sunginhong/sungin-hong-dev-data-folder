const easingMap: Record<string, number[]> = {
    NaverEaseStandard: [0.15, 0, 0.15, 1],
    NaverEaseOut1: [0.33, 1, 0.68, 1],
    NaverEaseOut2: [0.25, 1, 0.5, 1],
    NaverEaseIn: [0.55, 0.055, 0.675, 0.19],
    NaverEaseInOut: [0.65, 0, 0.35, 1],
    NaverEaseSpring1: [0.34, 1.5, 0.54, 1],
    NaverEaseSpring2: [0.45, 1.8, 0.57, 0.92],
    NaverEaseSpring3: [0.45, 2.4, 0.68, 0.86],
    Linear: [0, 0, 1, 1],
}

export const setEasing = (easing: string): number[] => {
    return easingMap[easing] ?? []
}
