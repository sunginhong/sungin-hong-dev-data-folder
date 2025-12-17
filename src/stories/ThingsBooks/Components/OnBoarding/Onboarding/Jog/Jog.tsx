import { useState, useEffect, useRef } from "react"
import Flicking from "@egjs/react-flicking"
import {
    motion,
    AnimatePresence,
    useTransform,
    useMotionValue,
    animate,
} from "framer-motion"
import JogUi from "./JogUi.tsx"
import JogCarousel from "./JogCarousel_Re.tsx"
import GradientBg from "./GradientBg.tsx"

interface props {
    currentIndex: (value: number) => void
    currentDeg: (value: number) => void
    onTouchBool: (value: boolean) => void
    onDragIdx: (value: number) => void
    onDirection: (value: string) => void
    instanceId?: string
}

const Jog: React.FC<props> = ({
    currentIndex,
    currentDeg,
    onTouchBool,
    onDragIdx,
    onDirection,
    instanceId,
}) => {
    // export default function Jog(props) {
    const [deg, setDeg] = useState<number>(0)
    const [currentIdx, setCurrentIndex] = useState<number>(0)
    const [touchBool, setTouchBool] = useState(false)
    const [dragIndex, setDragIndex] = useState(0)
    const [direction, setDirection] = useState<string>("")
    const nums = 7
    const items = [
        "Media",
        "Places",
        "Activities",
        "Creations",
        "Food & Drinks",
        "Social",
        "Showcase",
    ]
    const size = 516

    const handleDeg = (newValue) => {
        setDeg(-newValue)
        currentDeg(-newValue)
    }

    const handleCurrentIdx = (newValue) => {
        setCurrentIndex(newValue)
        currentIndex(newValue)
    }

    const handleTouchBool = (newValue) => {
        onTouchBool(newValue)
        setTouchBool(newValue)
    }

    const handleDragIdx = (newValue) => {
        setDragIndex(newValue)
        onDragIdx(newValue)
    }

    const handleDirection = (newValue) => {
        setDirection(newValue)
        onDirection(newValue)
    }

    useEffect(() => {}, [currentIdx])

    return (
        <div
            style={{
                position: "absolute",
                width: size + "px",
                height: size + "px",
                zIndex: "1000",
            }}
        >
            <GradientBg
                size={size}
                nums={nums}
                onDeg={-deg}
                currentIdx={currentIdx}
                touchBool={touchBool}
                instanceId={instanceId}
            />
            <div
                style={{
                    position: "absolute",
                    width: size + "px",
                    height: size + "px",
                }}
            ></div>
       

            <JogCarousel
                size={size}
                nums={nums}
                onDeg={handleDeg}
                onCurrentIdx={handleCurrentIdx}
                onTouchBool={handleTouchBool}
                onDragIdx={handleDragIdx}
                onDirection={handleDirection}
                instanceId={instanceId}
            />
        </div>
    )
}

export default Jog
