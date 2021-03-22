import React, { useEffect, useRef, useState } from "react";

import { binarySearch } from "../algorithms/BinarySearch.js";
import { bubbleSort } from "../algorithms/BubbleSort.js";
import { heapSort } from "../algorithms/HeapSort.js";
import { insertionSort } from "../algorithms/InsertionSort.js";
import { quickSort } from "../algorithms/QuickSort.js";
import { mergeSort } from "../algorithms/MergeSort.js";

import "./AlgorithmVisualizer.scss";

function AlgorithmVisualizer() {
    const MAX_HEIGHT = 500;

    const [animations, setAnimations] = useState([]);
    const [animationSpeed, setAnimationSpeed] = useState(25);
    const [bars, setBars] = useState([]);
    const [barsInfo, setBarsInfo] = useState([]);
    const [size, setSize] = useState(25);
    const [width, setWidth] = useState(20);
    const [showSettings, setShowSettings] = useState(false);

    const node = useRef();

    useEffect(() => {
        initializeWidth();
        // window.addEventListener("mousedown", testEvent)
        return function cleanup() {
            // window.removeEventListener("mousedown", testEvent);
            console.log("cleaning up");
        }
    }, []);

    useEffect(() => {
        initializeWidth();
        randomizeArray();
    }, [width, size]);

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
                    }, animationSpeed);
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
                    }, animationSpeed);
                    break;
                case "insert":
                    setTimeout(() => {
                        const barIdx = animation.barIdx;
                        const value = animation.value;
                        const tempBarsInfo = JSON.parse(JSON.stringify(barsInfo));
                        const tempBars = [ ...bars ];
                        tempBars[barIdx] = value;
                        tempBarsInfo[barIdx].height = `${value}px`;
                        setBars(tempBars);
                        setBarsInfo(tempBarsInfo);
                        setAnimations(tempAnimations);
                    }, animationSpeed);
            }
        }
    }, [animations]);

    const handleBubbleSort = () => {
        const tempArr = [ ...bars ];
        const sortingAnimations = bubbleSort(tempArr);
        setAnimations(sortingAnimations);
    };

    const handleHeapSort = () => {
        const tempArr = [ ...bars ];
        const sortingAnimations = heapSort(tempArr);
        setAnimations(sortingAnimations);
    };

    const handleInsertionSort = () => {
        const tempArr = [ ...bars ];
        const sortingAnimations = insertionSort(tempArr);
        setAnimations(sortingAnimations);
    };

    const handleInputChange = (e) => {
        switch(e.keyCode) {
            case 13:
                if (animations.length === 0 && isSorted()) {
                    const tempBarsInfo = JSON.parse(JSON.stringify(barsInfo));
                    for (let barInfo of tempBarsInfo) {
                        barInfo.backgroundColor = "lightblue";
                    }
                    setBarsInfo(tempBarsInfo);
                    const tempArr = [ ...bars ];
                    const binarySearchAnimations = binarySearch(tempArr, parseInt(e.target.value));
                    setAnimations(binarySearchAnimations);
                }
                break;
        }
    };

    const handleSettingsChange = (newSize) => {
        let newAnimationSpeed = 50;
        if (newSize >= 25) newAnimationSpeed = 25;
        if (newSize >= 50) newAnimationSpeed = 15;
        if (newSize >= 100) newAnimationSpeed = 10;

        setAnimationSpeed(newAnimationSpeed);
        setSize(newSize);
    }

    const handleMergeSort = () => {
        const tempArr = [ ...bars ];
        const sortingAnimations = mergeSort(tempArr);
        setAnimations(sortingAnimations);
    };

    const handleQuickSort = () => {
        const tempArr = [ ...bars ];
        const sortingAnimations = quickSort(tempArr);
        setAnimations(sortingAnimations);
    };

    const initializeWidth = () => {
        // left + right margin in px
        const marginWidth = 3;
        // window width / (# of elements + # to account for margin)
        const newWidth = Math.floor((window.innerWidth * .9) / size);
        setWidth(newWidth - marginWidth);
    };

    const isSorted = () => {
        if (bars && bars.length > 0) {
            for (let i = 1; i < bars.length; i++) {
                let prev = bars[i - 1];
                if (prev > bars[i]) return false;
            }

            return true;
        } else {
            return false;
        }
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

    // For some reason showSettings is not being recognized as true
    // const testEvent = (e) => {
    //     if (node.current.contains(e.target)) {
    //         console.log("INSIDE SETTINGS");
    //         console.log(showSettings);
    //     } else {
    //         console.log(showSettings);
    //         if (showSettings == true) {
    //             setShowSettings(false);
    //         }
    //         console.log("OUTIDE SETTINGS");
    //     }
    // };

    return (
        <div className="algorithm-visualizer-wrapper">
            <div className="algorithm-selector-container">
                <div className="sorting-selector" onClick={randomizeArray}>
                    Randomize
                </div>
                <div className="sorting-selector" onClick={handleBubbleSort}>
                    BubbleSort
                </div>
                <div className="sorting-selector" onClick={handleInsertionSort}>
                    InsertionSort
                </div>
                <div className="sorting-selector" onClick={handleHeapSort}>
                    HeapSort
                </div>
                <div className="sorting-selector" onClick={handleMergeSort}>
                    MergeSort
                </div>
                <div className="sorting-selector" onClick={handleQuickSort}>
                    QuickSort
                </div>
                <div className="input-container">
                    <div className="input-text">Binary Search</div>
                    <input className="input-box" onKeyDown={handleInputChange}></input>
                </div>
                <div className="settings-selector" ref={node} onClick={() => {setShowSettings(!showSettings)}}>
                    Settings
                    {showSettings &&
                        <div>
                            <div className="settings-option" onClick={() => {handleSettingsChange(10)}}>Small</div>
                            <div className="settings-option" onClick={() => {handleSettingsChange(25)}}>Medium</div>
                            <div className="settings-option" onClick={() => {handleSettingsChange(50)}}>Large</div>
                        </div>
                    }
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
