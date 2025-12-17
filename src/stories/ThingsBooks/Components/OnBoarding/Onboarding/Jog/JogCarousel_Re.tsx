import { useState, useEffect, useRef } from "react"
import Flicking from "@egjs/react-flicking"
import {
    motion,
    AnimatePresence,
    useTransform,
    useMotionValue,
    animate,
} from "framer-motion"

interface Props {
    size?: number
    nums?: number
    onDeg: (value: number) => void
    onCurrentIdx: (value: number) => void
    onTouchBool: (value: boolean) => void
    onDragIdx: (value: number) => void
    onDirection: (value: string) => void
    instanceId?: string
}

const JogCarousel_Re: React.FC<Props> = ({
    size,
    nums,
    onDeg,
    onCurrentIdx,
    onTouchBool,
    onDragIdx,
    onDirection,
    instanceId,
}) => {
    const screenWidth = 390

    const [position, setPosition] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [dragIndex, setDragIndex] = useState(0)
    const [lastCurrentIndex, setLastCurrentIndex] = useState(0)
    const [direction, setDirection] = useState<string>("")
    const scrollX = useMotionValue(position)
    const [hold, setHold] = useState(true)
    const [touchBool, setTouchBool] = useState(false)

    const flickingRef = useRef<Flicking | null>(null)
    const flickingRef2 = useRef<any>(null)

    const rotateWheel = [
        useTransform(scrollX, [-66, 1740], [0, 360]),
        useTransform(scrollX, [1740, 3546], [0, 360]),
        useTransform(scrollX, [3546, 5352], [0, 360]),
        useTransform(scrollX, [5352, 7158], [0, 360]),
        useTransform(scrollX, [7158, 8706], [0, 360 - 0]),
    ]

    useEffect(() => {
        if (hold) {
            setTimeout(() => setHold(false), 10)
        }
    }, [hold])

    useEffect(() => {
        scrollX.set(position)
    }, [position])

    useEffect(() => {
        onTouchBool(touchBool)
    }, [touchBool])

    useEffect(() => {}, [direction])

    useEffect(() => {
        const e = flickingRef.current
        if (!e) return

        const moveToMap = {
            1: { idx: 8, val: 1 },
            2: { idx: 9, val: 2 },
            3: { idx: 10, val: 3 },
            4: { idx: 11, val: 4 },
            5: { idx: 12, val: 5 },
            6: { idx: 13, val: 6 },
            22: { idx: 15, val: 1 },
            23: { idx: 16, val: 2 },
            24: { idx: 17, val: 3 },
            25: { idx: 18, val: 4 },
            26: { idx: 19, val: 5 },
            27: { idx: 20, val: 6 },
        }
        const currentIdxMap = [0, 7, 14, 21, 28]

        if (hold) {
            if (!(e as any).animating) {
                // duration을 0으로 변경
                flickingRef.current.moveTo(14, 0)
                onCurrentIdx(0)
            }
        } else {
            // 이하 동일
            if (moveToMap[currentIndex]) {
                if (!(e as any).animating) {
                   flickingRef.current.moveTo(moveToMap[currentIndex].idx, 0)
                    onCurrentIdx(moveToMap[currentIndex].val)
                }
            } else if (currentIdxMap.includes(currentIndex)) {
                if (!(e as any).animating) {
                    flickingRef.current.moveTo(14, 0)
                    onCurrentIdx(0)
                }
            } else if ([8, 15].includes(currentIndex)) {
                onCurrentIdx(1)
            } else if ([9, 16].includes(currentIndex)) {
                onCurrentIdx(2)
            } else if ([10, 17].includes(currentIndex)) {
                onCurrentIdx(3)
            } else if ([11, 18].includes(currentIndex)) {
                onCurrentIdx(4)
            } else if ([12, 19].includes(currentIndex)) {
                onCurrentIdx(5)
            } else if ([13, 20].includes(currentIndex)) {
                onCurrentIdx(6)
            }
        }
    }, [hold, currentIndex, onCurrentIdx])

    const initialScroll = (direction) => {
        let initialNumber = 0
        if (direction === "right") {
            initialNumber = 100
        }
        if (direction === "left") {
            initialNumber = 10
        }
        return initialNumber
    }

    // useEffect(() => {
    //     const e = flickingRef.current
    //     if (!e) return
    //     e.moveTo(14, 0)
    //     setCurrentIndex(14)
    //     onCurrentIdx(0)
    //     setHold(false)
    // }, []) 

    useEffect(() => {
        setTimeout(() => {
            if(flickingRef.current && currentIndex) {
                try {
                    flickingRef.current.moveTo(14, 0);
                    setCurrentIndex(14);
                    onCurrentIdx(0);
                    setHold(false);
                } catch (error) {
                    // 초기화 단계에서 에러 무시
                }
            }
        }, 10);
    }, []);


    const handleMoveStart = (e: any) => {
        if (hold) return // hold 중이면 무시
        const flickPos = parseFloat(
            (e.axesEvent.pos.flick - screenWidth / 2).toFixed(2)
        )
        setDirection(flickPos > position ? "right" : "left")
        if (!touchBool) setTouchBool(true)
    }

    const handleMove = (e: any) => {
        if (hold) return 

        if (!touchBool) setTouchBool(true)
        const newPosition = parseFloat(
            (e.axesEvent.pos.flick - screenWidth / 2).toFixed(2)
        )

        if (newPosition > position) {
            setDirection("right")
        } else if (newPosition < position) {
            setDirection("left")
        }
        onDirection(direction)
        let newIndex = 0

        if (flickingRef2.current) {
            newIndex = flickingRef2.current.getIndex()
        } else if (size && size > 0) {
            newIndex = Math.round(
                Number(newPosition + initialScroll(direction)) / (size / 2)
            )
        } else {
            newIndex = 0
        }

        setDragIndex(newIndex)
        onDragIdx(newIndex)

        setPosition(newPosition)
        const ranges = [1740, 3546, 5352, 7158, 8706]
        for (let i = 0; i < ranges.length; i++) {
            if (
                (i === 0 && position < ranges[i]) ||
                (i > 0 && position > ranges[i - 1] && position < ranges[i])
            ) {
                if (Math.abs(position - newPosition) > 100) {
                    // 처음 스크롤할 때 간극이 너무 크면 무시
                    return;
                }
                onDeg(parseInt(rotateWheel[i].get()));
                break
            }
        }
    }

    const handleMoveEnd = (e: any) => {
        if (touchBool) setTouchBool(false)
        setTimeout(() => {
            if (touchBool) setTouchBool(false)
        }, 1)
        setLastCurrentIndex(currentIndex)
    }

    const handleChanged = (e: any) => {
        setCurrentIndex(e.index)
        if (touchBool) setTouchBool(false)
    }

    return (
        <Flicking
            ref={flickingRef}
            className={"flicking " + instanceId}
            id={instanceId}
            onMoveStart={handleMoveStart}
            onMove={handleMove}
            onMoveEnd={handleMoveEnd}
            onChanged={handleChanged}
            duration={500}
            interruptable={false}
            circular={false}
            inputType={["touch", "mouse"]}
        >
            {Array.from({ length: nums * 5 }).map((_, i) => (
                <div
                    className={"panel " + instanceId}
                    key={i}
                    style={{
                        position: "absolute",
                        left: (size / 2) * i + "px",
                        width: size / 2 + "px",
                        height: size,
                        cursor: "pointer",
                    }}
                ></div>
            ))}
        </Flicking>
    )
}

export default JogCarousel_Re
