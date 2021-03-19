import React, { useEffect, useState } from "react";

import { heapSort } from "../algorithms/HeapSort.js";

import "./AlgorithmVisualizer.scss";

function AlgorithmVisualizer() {
    const [arr, setArr] = useState([]);
    const [maxHeight, setMaxHeight] = useState(500);
    const [size, setSize] = useState(25);
    const [width, setWidth] = useState(20);

    useEffect(() => {
        randomizeArray();
        initializeWidth();
        return function cleanup() {
            console.log("cleaning up");
        }
    }, []);

    const initializeWidth = () => {
        // left + right margin in px
        const marginWidth = 6;
        // window width / (# of elements + # to account for margin)
        const newWidth = Math.floor((window.innerWidth * .9) / size);
        setWidth(newWidth - marginWidth);
    };

    const randomizeArray = () => {
        let tempArr = [];
        for (let i = 0; i < size; i++) {
            tempArr.push(Math.floor(Math.random() * maxHeight));
        }
        setArr(tempArr);
    };

    const handleSort = () => {
        const tempArr = [ ...arr ];
        const sorted = heapSort(tempArr);
        setArr(sorted);
    }

    return (
        <div className="algorithm-visualizer-wrapper">
            <button onClick={handleSort}>Test</button>
            <div className="algorithm-bar-wrapper">
                {
                    arr.map((item,) => {
                        const style = {
                            height: `${item}px`,
                            width: `${width}px`,
                            fontSize: `${width/2}px`,
                        };
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
