function bubbleSort(arr) {
    const animations = [];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            animations.push({type : "color", barOneIdx: j, barTwoIdx: j+1, color: "#ea4335"});
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                animations.push({type : "swap", barOneIdx: j, barTwoIdx: j+1});
            }
            if (j === n-i-2) {
                animations.push({type : "color", barOneIdx: j+1, barTwoIdx: j+1, color: "lightgreen"});
            }
            animations.push({type : "color", barOneIdx: j, barTwoIdx: j+1, color: "lightblue"});
        }
    }

    return animations;
}

export { bubbleSort };