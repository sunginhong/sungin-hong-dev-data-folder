import React, { useEffect, useState } from "react"
import { useTransform, useMotionValue, motion } from "framer-motion"
import { CalcBeforeIndex } from "../../../../../../../src/styles/Utils/CalcBeforeIndex.tsx"
import { setEasing } from "../../../../../../../src/styles/Utils/SetEasing.jsx"

const BALL_SIZE = 140
const STAND_NUMBER = BALL_SIZE / 5
const STAND_DEG = 51
const STAND_SCALE = 1
let randomArray = []
const array = [0.1, 0.2, 0.3, 0.4, 0.5]

interface props {
    currentDeg?: number
    pageIdx?: number
    dataSet?: { top: number; left: number; iconImg?: string }[]
    idx?: number
    touchBool?: boolean
    currentIdx?: number
    beforeIndex?: number
    direction?: string
}

const generateRandomArray = () => {
    const newRandomArray: number[] = []
    for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * array.length)
        newRandomArray.push(array[randomIndex])
    }
    randomArray.push(newRandomArray)
}

const getTransforms = (currentDegF, idx: number) => ({
    posX: [
        useTransform(
            currentDegF,
            [0, -51, -308, -359],
            [0, -STAND_NUMBER, STAND_NUMBER, 0]
        ),
        useTransform(
            currentDegF,
            [0, -51, -102],
            [STAND_NUMBER, 0, -STAND_NUMBER]
        ),
        useTransform(
            currentDegF,
            [-51, -102, -154],
            [STAND_NUMBER, 0, -STAND_NUMBER]
        ),
        useTransform(
            currentDegF,
            [-102, -154, -205],
            [STAND_NUMBER, 0, -STAND_NUMBER]
        ),
        useTransform(
            currentDegF,
            [-154, -205, -257],
            [STAND_NUMBER, 0, -STAND_NUMBER]
        ),
        useTransform(
            currentDegF,
            [-205, -257, -308],
            [STAND_NUMBER, 0, -STAND_NUMBER]
        ),
        useTransform(
            currentDegF,
            [-257, -308, -364],
            [STAND_NUMBER, 0, -STAND_NUMBER]
        ),
    ],

    scale: [
        useTransform(
            currentDegF,
            [0, -51, -308, -359],
            [1, 1 / (idx !== 0 ? idx : 3), 1 / (idx !== 0 ? idx : 3), 1]
        ),
        useTransform(
            currentDegF,
            [0, -51, -102],
            [1 / (idx !== 0 ? idx : 3), 1, 1 / (idx !== 0 ? idx : 3)]
        ),
        useTransform(
            currentDegF,
            [-51, -102, -154],
            [1 / (idx !== 0 ? idx : 3), 1, 1 / (idx !== 0 ? idx : 3)]
        ),
        useTransform(
            currentDegF,
            [-102, -154, -205],
            [1 / (idx !== 0 ? idx : 3), 1, 1 / (idx !== 0 ? idx : 3)]
        ),
        useTransform(
            currentDegF,
            [-154, -205, -257],
            [1 / (idx !== 0 ? idx : 3), 1, 1 / (idx !== 0 ? idx : 3)]
        ),
        useTransform(
            currentDegF,
            [-205, -257, -308],
            [1 / (idx !== 0 ? idx : 3), 1, 1 / (idx !== 0 ? idx : 3)]
        ),
        useTransform(
            currentDegF,
            [-257, -308, -364],
            [1 / (idx !== 0 ? idx : 3), 1, 1 / (idx !== 0 ? idx : 3)]
        ),
    ],

    rotate: [
        useTransform(
            currentDegF,
            [0, -51, -308, -359],
            [0, -STAND_DEG, STAND_DEG, 0]
        ),
        useTransform(currentDegF, [0, -51, -102], [STAND_DEG, 0, -STAND_DEG]),
        useTransform(
            currentDegF,
            [-51, -102, -154],
            [STAND_DEG, 0, -STAND_DEG]
        ),
        useTransform(
            currentDegF,
            [-102, -154, -205],
            [STAND_DEG, 0, -STAND_DEG]
        ),
        useTransform(
            currentDegF,
            [-154, -205, -257],
            [STAND_DEG, 0, -STAND_DEG]
        ),
        useTransform(
            currentDegF,
            [-205, -257, -308],
            [STAND_DEG, 0, -STAND_DEG]
        ),
        useTransform(
            currentDegF,
            [-257, -308, -364],
            [STAND_DEG, 0, -STAND_DEG]
        ),
    ],
})

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

const Balls: React.FC<props> = ({
    currentDeg = 0,
    pageIdx = 0,
    dataSet = [],
    idx = 0,
    touchBool = false,
    currentIdx = 0,
    beforeIndex = 0,
}) => {
    const ballStyle = {
        position: "absolute" as const,
        width: `${BALL_SIZE}px`,
        height: `${BALL_SIZE}px`,
        flexShrink: "0",
        backgroundSize: "cover",
        borderRadius: "100%",
    }

    const currentDegF = useMotionValue(currentDeg)
    const { rotate } = getTransforms(currentDegF, idx)
    const { posX } = getTransforms(currentDegF, idx)
    const { scale } = getTransforms(currentDegF, idx)

    useEffect(() => {
        currentDegF.set(currentDeg)
    }, [currentDeg, currentDegF])

    const [scaleArr] = useState<number[]>(() =>
        shuffle([
            0, 0.03, 0.06, 0.1, 0.13, 0.16, 0.2, 0.23, 0.26, 0.3, 0.33, 0.36,
            0.4, 0.43, 0.46, 0.5,
        ])
    )
    const [durationArr] = useState<number[]>(() =>
        shuffle([
            0, 0.01, 0.02, 0.03, 0.04, 0.06, 0.08, 0.09, 0.1, 0.13, 0.16, 0.19,
            0.2, 0.23, 0.26, 0.3, 0.33, 0.36, 0.39, 0.4, 0.45, 0.5,
        ])
    )
    const [delayArr] = useState<number[]>(() =>
        shuffle([
            0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2, 0.22,
            0.24, 0.26, 0.28, 0.3,
        ])
    )
    const [rotateArr] = useState<number[]>(() =>
        Array.from(
            { length: 19 },
            () =>
                shuffle([
                    1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45, 1.5, 1.55, 1.6,
                    1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 2,
                ])[0]
        )
    )
    function shuffleIdx(array: number[]) {
        return array.slice().sort(() => Math.random() - 0.5)
    }

    const [idxArr] = useState<number[]>(() =>
        shuffleIdx([0, 1, 2, 3, 4, 5, 6, 7])
    )

    const [idxRandom, setIdxRandom] = useState<number[]>([])

    useEffect(() => {
        setIdxRandom(idxArr)
    }, [idxArr])

    useEffect(() => {
        generateRandomArray()
    }, [])

    const isCurrent = pageIdx === currentIdx
    const isBefore = currentIdx === CalcBeforeIndex(beforeIndex)
    const notBefore = currentIdx !== CalcBeforeIndex(beforeIndex)

    const getPosX = () =>
        touchBool
            ? Number(
                  (
                      posX[pageIdx]?.get() * (rotateArr[idxArr[idx]] ?? 1)
                  ).toFixed(1)
              )
            : 0

    const getRotate = () =>
        touchBool
            ? Number(
                  (
                      rotate[pageIdx]?.get() * (rotateArr[idxArr[idx]] ?? 1)
                  ).toFixed(1)
              )
            : 0

    const getScale = () =>
        touchBool
            ? Number(scale[pageIdx]?.get().toFixed(4))
            : currentIdx === pageIdx
              ? 1
              : 0

    const getOpacity = () =>
        touchBool ? (isCurrent ? 1 : notBefore ? 1 : 0) : 1

    const getDurationDrag = () => (touchBool ? 0 : 0.4)

    const getDuration = () =>
        touchBool
            ? isCurrent
                ? 0.5 + (durationArr[idxArr[idx]] ?? 0)
                : notBefore
                  ? 0.5 + (durationArr[idxArr[idx]] ?? 0)
                  : 0.3
            : 0

    const getDelay = () =>
        touchBool
            ? isCurrent
                ? 0.1 + 0.03 * (idxRandom[idx] ?? 0)
                : notBefore
                  ? 0.1 + 0.03 * (idxRandom[idx] ?? 0)
                  : 0
            : 0

    return (
       
        <motion.div
            style={{
                ...ballStyle,
                top: `${dataSet[idx]?.top ?? 0}px`,
                left: `${dataSet[idx]?.left ?? 0}px`,
            }}
            animate={{
                x: idx % 2 ? getPosX() * 1.5 : idx % 3 ? 0 : getPosX(),
                y: idx % 2 ? getPosX() * 2 : idx % 3 ? 0 : getPosX() * 1.5,
            }}
            transition={{
                x: {
                    duration: 1,
                    ease: [0.33, 1, 0.68, 1],
                },
                y: {
                    duration: 1,
                    ease: [0.33, 1, 0.68, 1],
                },
            }}
        >
            {}
            <motion.div
                style={{
                    ...ballStyle,
                    backgroundImage: `url(${dataSet[idx]?.iconImg ?? ""})`,
                }}
                initial={{
                    scale: getScale(),
                    rotate: getRotate(),
                }}
                animate={{
                    scale: idx % 2 ? getScale() : idx % 3 ? 1 : getScale(),
                    rotate:
                        idx === CalcBeforeIndex(beforeIndex)
                            ? idx % 2
                                ? getRotate()
                                : idx % 3
                                  ? 0
                                  : getRotate()
                            : 0,
                }}
                transition={{
                    duration: 1,
                    ease: [0.33, 1, 0.68, 1],
                }}
            />
        </motion.div>
    )
}

export default Balls
