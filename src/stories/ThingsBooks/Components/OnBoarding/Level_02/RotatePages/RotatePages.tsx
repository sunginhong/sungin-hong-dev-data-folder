import { useState, useEffect, useRef } from "react"
import { useTransform, useMotionValue } from "framer-motion"
import Page1 from "../Pages/Page1.tsx"
import Page2 from "../Pages/Page2.tsx"
import Page3 from "../Pages/Page3.tsx"

interface props {
    nums?: number
    deg?: number
    touchBool?: boolean
    currentIdx?: number
    beforeIndex?: number
    direction?: string
}

const RotatePages: React.FC<props> = ({
    nums,
    deg = 0, // 기본값 설정
    touchBool,
    currentIdx,
    beforeIndex,
    direction,
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const degF = useMotionValue(deg) // deg prop 값으로 초기화
    const itemsStyle = {
        position: "absolute",
        width: 390 + "px",
        height: 844 + "px",
        color: "000",
        textAlign: "center",
        transformOrigin: "center bottom",
        overflow: "visible",
        fontSize: "120px",
        cursor: "pointer",
        transition: "transform 0.5s ease-in-out",
    }

    const pageStyle = {
        position: "absolute",
        width: 390 + "px",
        height: 844 + "px",
        top: -162 + "px",
    }

    const handleItemClick = (index: number) => {
        setSelectedIndex(index)
    }

    const rotateCalc = useTransform(
        degF,
        [0, -51, -102, -154, -205, -257, -308, -359],
        [-0.2, -53.8, -104.9, -156.0, -207, -258, -309.0, -360]
    )

    const posXCalc = useTransform(
        degF,
        [0, -51, -102, -154, -205, -257, -308, -359],
        [12, 12, 14, 12, 10, 8, 8, 11]
    )
    const posYCalc = useTransform(
        degF,
        [0, -51, -102, -154, -205, -257, -308, -359],
        [12, 12, 15, 18, 19, 18, 14, 12]
    )

    useEffect(() => {
        // deg 값이 유효한 숫자인지 확인 후 설정
        if (typeof deg === 'number' && !isNaN(deg)) {
            degF.set(deg)
        }
    }, [deg])

    useEffect(() => {
    }, [deg])

    return (
        <div
            style={{
                position: "absolute",
                width: 390 + "px",
                height: 390 + "px",
                top: "810px",
                left: "50%",
                transform: "translateX(-50%)",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    width: 390 + "px",
                    height: 390 + "px",
                    transform:
                        "rotate(" +
                        rotateCalc.get() +
                        "deg) translate(" +
                        posXCalc.get() +
                        "px, " +
                        posYCalc.get() +
                        "px)",
                    transition: !touchBool
                        ? currentIdx !== 6 && currentIdx !== 0
                            ? "transform 0ms cubic-bezier(0.33, 1, 0.68, 1)"
                            : "transform 500ms cubic-bezier(0.33, 1, 0.68, 1) 500ms"
                        : (currentIdx === beforeIndex && currentIdx === 6) ||
                            currentIdx === 0
                          ? "transform 0ms cubic-bezier(0.33, 1, 0.68, 1)"
                          : "transform 300ms cubic-bezier(0.33, 1, 0.68, 1)",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        width: 390 + "px",
                        height: 844 + "px",
                        top: "-665px",
                        left: "-10px",
                    }}
                >
                    {Array.from({ length: nums }).map((_, i) => (
                        <div
                            key={i}
                            style={{
                                ...itemsStyle,
                                transform: `rotate(${i === 0 ? -0 : i === 1 ? 54 : i === 2 ? 105 : i === 3 ? 156 : i === 4 ? -153 : i === 5 ? -102 : i === 6 ? -51 : i === 7 ? 0 : 0}deg)`,
                            }}
                        >
                            <div key={i} style={{ ...pageStyle }}>
                                {i === 0 ? (
                                    <Page1
                                        currentDeg={deg}
                                        pageIdx={0}
                                        touchBool={touchBool}
                                        currentIdx={currentIdx}
                                        beforeIndex={beforeIndex}
                                        direction={direction}
                                    />
                                ) : i === 1 ? (
                                    <Page2
                                        currentDeg={deg}
                                        pageIdx={1}
                                        touchBool={touchBool}
                                        currentIdx={currentIdx}
                                        beforeIndex={beforeIndex}
                                        direction={direction}
                                    />
                                ) : i === 2 ? (
                                    <Page3
                                        currentDeg={deg}
                                        pageIdx={2}
                                        touchBool={touchBool}
                                        currentIdx={currentIdx}
                                        beforeIndex={beforeIndex}
                                        direction={direction}
                                    />
                                ) : i === 3 ? (
                                    <Page1
                                        currentDeg={deg}
                                        pageIdx={3}
                                        touchBool={touchBool}
                                        currentIdx={currentIdx}
                                        beforeIndex={beforeIndex}
                                        direction={direction}
                                    />
                                ) : i === 4 ? (
                                    <Page2
                                        currentDeg={deg}
                                        pageIdx={4}
                                        touchBool={touchBool}
                                        currentIdx={currentIdx}
                                        beforeIndex={beforeIndex}
                                        direction={direction}
                                    />
                                ) : i === 5 ? (
                                    <Page3
                                        currentDeg={deg}
                                        pageIdx={5}
                                        touchBool={touchBool}
                                        currentIdx={currentIdx}
                                        beforeIndex={beforeIndex}
                                        direction={direction}
                                    />
                                ) : i === 6 ? (
                                    <Page2
                                        currentDeg={deg}
                                        pageIdx={6}
                                        touchBool={touchBool}
                                        currentIdx={currentIdx}
                                        beforeIndex={beforeIndex}
                                        direction={direction}
                                    />
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default RotatePages
