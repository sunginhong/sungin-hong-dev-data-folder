import React, { useState, useEffect, useRef } from "react"
import {
    motion,
    AnimatePresence,
    useTransform,
    useMotionValue,
    animate,
} from "framer-motion"
import { thumbnail_img_00, thumbnail_img_01, thumbnail_img_02, thumbnail_img_03 } from "../src/ImgsFolder/Imgs.tsx"
import { setEasing } from "../../../../../../../src/styles/Utils/SetEasing.jsx"
import Balls from "../src/Balls.tsx"

interface props {
    currentDeg?: number
    pageIdx?: number
    touchBool?: boolean
    currentIdx?: number
    beforeIndex?: number
    direction?: string
}

const Page3: React.FC<props> = ({
    currentDeg,
    pageIdx,
    touchBool,
    currentIdx,
    beforeIndex,
    direction,
}) => {
    const dataSet = [
        {
            left: -16,
            top: 288,
            iconImg: thumbnail_img_00,
        },
        {
            left: 127,
            top: 377,
            iconImg: thumbnail_img_01,
        },
        {
            left: 260,
            top: 256,
            iconImg: thumbnail_img_02,
        },
        {
            left: -14,
            top: 469,
            iconImg: thumbnail_img_03,
        },
        {
            left: 144,
            top: 566,
            iconImg: thumbnail_img_00,
        },
        {
            left: 266,
            top: 449,
            iconImg: thumbnail_img_01,
        },
    ]
    return (
        <div
            className={"page_" + pageIdx}
            style={{
                width: "390px",
                height: "844px",
                transformOrigin: "50% 100%",
                transform: "rotate(0deg)",
            }}
        >
            {dataSet.map((item, index) => (
                <Balls
                    currentDeg={currentDeg}
                    pageIdx={pageIdx}
                    dataSet={dataSet}
                    idx={index}
                    touchBool={touchBool}
                    currentIdx={currentIdx}
                    beforeIndex={beforeIndex}
                    direction={direction}
                />
            ))}
        </div>
    )
}
export default Page3
