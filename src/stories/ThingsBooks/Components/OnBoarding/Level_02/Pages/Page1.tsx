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

const Page1: React.FC<props> = ({
    currentDeg,
    pageIdx,
    touchBool,
    currentIdx,
    beforeIndex,
    direction,
}) => {
    const dataSet = [
        {
            left: -14,
            top: 232,
            iconImg: thumbnail_img_00,
        },
        {
            left: 127,
            top: 317,
            iconImg: thumbnail_img_01,
        },
        {
            left: 256,
            top: 234,
            iconImg: thumbnail_img_02,
        },
        {
            left: -10,
            top: 395,
            iconImg: thumbnail_img_03,
        },
        {
            left: 124,
            top: 479,
            iconImg: thumbnail_img_00,
        },
        {
            left: 267,
            top: 395,
            iconImg: thumbnail_img_01,
        },
        {
            left: -9,
            top: 566,
            iconImg: thumbnail_img_02,
        },
        {
            left: 259,
            top: 567,
            iconImg: thumbnail_img_03,
        },
    ]
    const degF = useMotionValue(0)
    const rotate = useTransform(degF, [0, -51], [0, -51])

    useEffect(() => {
        degF.set(currentDeg)
    }, [currentDeg])

    return (
        <div
            className={"page_" + pageIdx}
            style={{
                width: "390px",
                height: "844px",
                transformOrigin: "50% 50%",
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
export default Page1
