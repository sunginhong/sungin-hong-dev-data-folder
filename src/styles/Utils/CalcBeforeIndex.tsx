export const CalcBeforeIndex = (idx: number): number => {
    if ([0, 7, 14, 21].includes(idx)) return 0
    if ([1, 8, 15, 22].includes(idx)) return 1
    if ([2, 9, 16, 23].includes(idx)) return 2
    if ([3, 10, 17, 24].includes(idx)) return 3
    if ([4, 11, 18, 25].includes(idx)) return 4
    if ([5, 12, 19, 26].includes(idx)) return 5
    if ([6, 13, 20, 27].includes(idx)) return 6
    return 0
}
