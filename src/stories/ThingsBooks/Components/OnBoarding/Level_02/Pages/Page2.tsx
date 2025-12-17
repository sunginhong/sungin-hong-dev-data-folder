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

const Page2: React.FC<props> = ({
    currentDeg,
    pageIdx,
    touchBool,
    currentIdx,
    beforeIndex,
    direction,
}) => {
    const dataSet = [
        {
            left: -9,
            top: 240,
            iconImg: thumbnail_img_00,
        },
        {
            left: 115,
            top: 369,
            iconImg: thumbnail_img_01,
        },
        {
            left: 261,
            top: 298,
            iconImg: thumbnail_img_02,
        },
        {
            left: -14,
            top: 482,
            iconImg: thumbnail_img_03,
        },
        {
            left: 122,
            top: 556,
            iconImg: thumbnail_img_00,
        },
        {
            left: 257,
            top: 468,
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
export default Page2
