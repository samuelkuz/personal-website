import React, { useEffect, useState } from "react";

import { heapSort } from "../algorithms/HeapSort.js";

import "./AlgorithmVisualizer.scss";

function AlgorithmVisualizer() {
    const ANIMATION_SPEED = 50;
    const MAX_HEIGHT = 500;

    const [animations, setAnimations] = useState([]);
    const [bars, setBars] = useState([]);
    const [barsInfo, setBarsInfo] = useState([]);
    const [size, setSize] = useState(25);
    const [width, setWidth] = useState(20);

    useEffect(() => {
        initializeWidth();
        return function cleanup() {
            console.log("cleaning up");
        }
    }, []);

    useEffect(() => {
        randomizeArray();
    }, [width]);

    useEffect(() => {
        if (animations.length > 0) {
            const tempAnimations = [ ...animations ];
            const animation = tempAnimations.shift();
            switch (animation.type) {
                case "color": 
                    setTimeout(() => {
                        const barOneIdx = animation.barOneIdx;
                        const barTwoIdx = animation.barTwoIdx;
                        const color = animation.color;
                        const tempBarsInfo = JSON.parse(JSON.stringify(barsInfo));
                        tempBarsInfo[barOneIdx].backgroundColor = color;
                        tempBarsInfo[barTwoIdx].backgroundColor = color;
                        setBarsInfo(tempBarsInfo);
                        setAnimations(tempAnimations);
                    }, ANIMATION_SPEED);
                    break;
                case "swap":
                    setTimeout(() => {
                        const barOneIdx = animation.barOneIdx;
                        const barTwoIdx = animation.barTwoIdx;
                        const tempBarsInfo = JSON.parse(JSON.stringify(barsInfo));
                        const tempBars = [ ...bars ];
                        [tempBarsInfo[barOneIdx], tempBarsInfo[barTwoIdx]] = [tempBarsInfo[barTwoIdx], tempBarsInfo[barOneIdx]];
                        [tempBars[barOneIdx], tempBars[barTwoIdx]] = [tempBars[barTwoIdx], tempBars[barOneIdx]];
                        setBars(tempBars);
                        setBarsInfo(tempBarsInfo);
                        setAnimations(tempAnimations);
                    }, ANIMATION_SPEED);
                    break;
            }
        }
    }, [animations]);

    const initializeWidth = () => {
        // left + right margin in px
        const marginWidth = 4;
        // window width / (# of elements + # to account for margin)
        const newWidth = Math.floor((window.innerWidth * .9) / size);
        setWidth(newWidth - marginWidth);
    };

    const randomizeArray = () => {
        if (animations.length > 0) return;
        let tempBars = [];
        let tempStyles = [];
        for (let i = 0; i < size; i++) {
            const randomVal = Math.floor(Math.random() * MAX_HEIGHT);
            const initStyle = {
                height: `${randomVal}px`,
                width: `${width}px`,
                fontSize: `${width/2}px`,
                backgroundColor: "lightblue",
            }
            tempBars.push(randomVal);
            tempStyles.push(initStyle);
        }
        setBars(tempBars);
        setBarsInfo(tempStyles);
    };

    const handleHeapSort = () => {
        const tempArr = [ ...bars ];
        const sortingAnimations = heapSort(tempArr);
        setAnimations(sortingAnimations);
    }

    return (
        <div className="algorithm-visualizer-wrapper">
            <div className="sorting-selector-container">
                <div className="sorting-selector" onClick={randomizeArray}>
                    Randomize
                </div>
                <div className="sorting-selector" onClick={handleHeapSort}>
                    HeapSort
                </div>
            </div>
            <div className="algorithm-bar-wrapper">
                {
                    bars.map((item, idx) => {
                        const style = barsInfo[idx];
                        return (
                            <div className="algorithm-bar" key={Math.random() * 10000} style={style}>{item}</div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default AlgorithmVisualizer;
