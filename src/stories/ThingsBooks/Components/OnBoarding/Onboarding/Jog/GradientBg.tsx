import { useEffect } from "react"
import { useTransform, useMotionValue } from "framer-motion"

interface Props {
    size?: number
    nums?: number
    onDeg?: number
    currentIdx?: number
    touchBool?: boolean
    instanceId?: string
    progressShow?: boolean
}

const bgs = [
    "https://framerusercontent.com/images/GbbB9FAVWWRd0LgdethBunAkbY.png",
    "https://framerusercontent.com/images/wwinrofrDfiZ9PfBAhfqAuAGefw.png",
    "https://framerusercontent.com/images/hKic0D6elPZNwZYBg9eKQwD8Dq4.png",
    "https://framerusercontent.com/images/UMbZ5jahF02k6XadiMyvkcF4cNE.png",
    "https://framerusercontent.com/images/ePmFrcGU3Xij66hhPuJE1LjTmAk.png",
    "https://framerusercontent.com/images/Njb3HPH2BJPqPmkXUnAsJKPRUls.png",
    "https://framerusercontent.com/images/rSQoFHb31QvFKQV0JmQxn1vc1kI.png",
]

const GradientBg: React.FC<Props> = ({
    size = 400,
    nums = 8,
    onDeg = 0,
    currentIdx,
    touchBool,
    instanceId,
    progressShow,
}) => {
    const degMotion = useMotionValue(onDeg)

    // useEffect(() => {
    //     console.log(touchBool)
    // }, [touchBool])

    useEffect(() => {
        degMotion.set(onDeg)
    }, [onDeg, degMotion])

    const colorTransforms = Array.from({ length: nums }, (_, i) => {
        if (i === 0) {
            return useTransform(degMotion, [0, 51 * 1], [1, 0])
        }
        return useTransform(
            degMotion,
            [51 * (i - 1), 51 * i, 51 * (i + 1)],
            [0, 1, 0]
        )
    })
    const colorLast = useTransform(degMotion, [308, 360], [0, 1])

    const containStyle: React.CSSProperties = {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        backgroundSize: "cover",
        transformOrigin: "center center",
        borderRadius: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `rotate(${-onDeg}deg)`,
    }

    const bgStyle: React.CSSProperties = {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        backgroundSize: "cover",
    }

    return (
        <div className={"bgContainer " + instanceId} style={containStyle}>
            {Array.from({ length: nums }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        ...bgStyle,
                        backgroundImage: `url(${bgs[i % bgs.length]})`,
                        transform: `rotate(${i * (360 / nums)}deg)`,
                        opacity: colorTransforms[i].get(),
                    }}
                >
                    {progressShow ? (
                        <div
                            style={{
                                position: "absolute",
                                left: "50%",
                                zIndex: "10000",
                                marginTop: 258 / 2 - 30 / 2 + "px",
                                transform: "translateX(-50%)",
                                backgroundColor: "rgba(0,0,0,0.7)",
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
            ))}
            <div
                style={{
                    ...bgStyle,
                    backgroundImage: `url(${bgs[0]})`,
                    transform: `rotate(0deg)`,
                    opacity: colorLast.get(),
                }}
            >
                {progressShow ? (
                    <div
                        style={{
                            position: "absolute",
                            left: "50%",
                            zIndex: "10000",
                            marginTop: 258 / 2 - 30 / 2 + "px",
                            transform: "translateX(-50%)",
                            backgroundColor: "rgba(0,0,0,0.7)",
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
                                colorLast.get().toFixed(1)}
                        </span>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default GradientBg
