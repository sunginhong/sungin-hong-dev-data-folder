import { useState, useEffect, useRef } from "react"
import Flicking from "@egjs/react-flicking"
import {
    motion,
    AnimatePresence,
    useTransform,
    useMotionValue,
    animate,
} from "framer-motion"
import Jog from "../Onboarding/Jog/Jog.tsx"
import RotatePages from "./RotatePages/RotatePages.tsx"

export default function Level2(props) {
    const instanceId = Math.random().toString(36).substr(2, 9)
    const [currentIdx, setCurrentIndex] = useState<number>(0)
    const [beforeIndex, setBeforeIndex] = useState(0)
    const [deg, setDeg] = useState<number>(0)
    const margin = 50
    const degF = useMotionValue(0)
    const pageWidth = 390 + margin
    const correction = 0 

    const scrollPosX = useTransform(degF, [0, -360], [0, pageWidth * 7])

    const [touchBool, setTouchBool] = useState(false)
    const [direction, setDirection] = useState<string>("")
    const [scrollX, setScrollX] = useState(0)

    const handleCurrentIdx = (newValue) => {
        setCurrentIndex(newValue)
    }
    const handleCurrentDeg = (newValue) => {
        setDeg(newValue)
        degF.set(newValue)
    }

    const handleTouchBool = (newValue) => {
        setTouchBool(newValue)
    }

    const handleDragIdx = (newValue) => {
        setBeforeIndex(newValue)
    }

    const handleDirection = (newValue) => {
        setDirection(newValue)
    }

    useEffect(() => {
        setScrollX(parseFloat(scrollPosX.get().toFixed(1)))
    }, [scrollPosX.get()])

    return (
        <div
            style={{
                width: "390px",
                height: "844px",
                border: "1px solid rgba(0,0,0,0.15)",
            }}
        >
        <div
            style={{
                position: "absolute",
                width: "390px",
                height: "844px",
                backgroundColor: "#fff",
                overflow: "hidden",
            }}
        >

            <RotatePages
                nums={7}
                deg={deg}
                touchBool={touchBool}
                currentIdx={currentIdx}
                beforeIndex={beforeIndex}
                direction={direction}
            />

            <div
                className={"jogContainer"}
                style={{
                    position: "absolute",
                    top: "720px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "516px",
                    height: "516px",
                    zIndex: 1000,
                }}
            >
                <Jog
                    currentIndex={handleCurrentIdx}
                    currentDeg={handleCurrentDeg}
                    onTouchBool={handleTouchBool}
                    onDragIdx={handleDragIdx}
                    onDirection={handleDirection}
                    instanceId={instanceId}
                />
            </div>
        </div>
        </div>
    )
}
