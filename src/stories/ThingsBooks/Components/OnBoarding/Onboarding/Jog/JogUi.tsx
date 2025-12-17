import { useState, useEffect, useRef } from "react"
import { useTransform, useMotionValue } from "framer-motion"

interface props {
    size?: number
    nums?: number
    items?: any
    onDeg?: number
    currentIdx?: number
    instanceId?: string
    textShow?: boolean
    textProgress?: boolean
}

const JogUi: React.FC<props> = ({
    size,
    nums,
    items,
    onDeg,
    currentIdx,
    instanceId,
    textShow,
    textProgress,
}) => {
    const degMotion = useMotionValue(onDeg)

    useEffect(() => {
        degMotion.set(onDeg)
    }, [onDeg, degMotion])

    // opacity transforms for each background
    const colorTransforms = Array.from({ length: nums }, (_, i) => {
        if (i === 0) {
            return useTransform(degMotion, [0, 51 * 1], [1, 0])
        }
        return useTransform(
            degMotion,
            [51 * (i - 1), 51 * i, 51 * (i + 1)],
            [0.4, 1, 0.4]
        )
    })
    const colorLast = useTransform(degMotion, [308, 360], [0, 1])
    const firstTitle1 = useTransform(degMotion, [0, 51], [1, 0])
    const firstTitle2 = useTransform(degMotion, [301, 360], [0.4, 1])

    const containStyle = {
        width: size + "px",
        height: size + "px",
        backgroundSize: "cover",
        transformOrigin: "center center",
        borderRadius: "100%",
        overflow: "hidden",
    }

    const itemsStyle = {
        position: "absolute",
        // width: size / nums + "px",
        height: size / 2 + "px",
        color: "#fff",
        textAlign: "center",
        transformOrigin: "center bottom",
        overflow: "visible",
        paddingTop: "37px",
    }

    const titleStyle = {
        position: "relative",
        width: "fit-content", // 변경됨
        textAlign: "center",
        fontFamily:
            "'Poppins', 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', 'sans-serif'",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "128%",
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
    }

    return (
        <div
            className={"container"}
            style={{
                ...containStyle,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `rotate(${-onDeg}deg)`,
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: size + "px",
                    height: size + "px",
                }}
            >
                {Array.from({ length: nums }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            ...itemsStyle,
                            left: size / 2 - size / (2 * nums) + "px",
                            transform: `rotate(${i * (360 / nums)}deg)`,
                            backgroundColor: "red"
                        }}
                    >
                        <div
                            style={{
                                ...titleStyle,
                                width: "100%",
                                opacity:
                                    i !== 0
                                        ? colorTransforms[i].get()
                                        : firstTitle1.get(),
                            }}
                        >
                            {items[i]}
                            {textProgress ? (
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        zIndex: "10000",
                                        transform: "translateX(-50%)",
                                        border: "1px solid rgba(255,255,255,0.7)",
                                        padding: "6px 16px",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "15px",
                                            fontWeight: "700",
                                            color: "#fff",
                                        }}
                                    >
                                        {"index: " +
                                            i +
                                            ", " +
                                            "Opacity: " +
                                            colorTransforms[i].get().toFixed(1)}
                                    </span>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ))}
                <div
                    style={{
                        ...itemsStyle,
                        left: size / 2 - size / (2 * nums) + "px",
                        transform: `rotate(${0 * (360 / nums)}deg)`,
                    }}
                >
                    <div
                        style={{
                            ...titleStyle,
                            width: "100%",
                            opacity: firstTitle2.get(),
                        }}
                    >
                        {items[0]}
                        {textProgress ? (
                            <div
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    zIndex: "10000",
                                    marginTop: 258 / 2 - 30 / 2 + "px",
                                    transform: "translateX(-50%)",
                                    border: "1px solid rgba(255,255,255,0.7)",
                                    padding: "6px 16px",
                                    borderRadius: "4px",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: "700",
                                        color: "#fff",
                                    }}
                                >
                                    {"index: " +
                                        0 +
                                        ", " +
                                        "Opacity: " +
                                        firstTitle2.get().toFixed(1)}
                                </span>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default JogUi
