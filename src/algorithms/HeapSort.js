function heapSort(arr) {
    const animations = [];

    let length = arr.length;

    for (let i = Math.floor((length / 2 ) - 1); i >= 0; i--) {
        heapify(arr, length, i, animations);
    }

    for (let i = length - 1; i > 0; i--) {
        animations.push({type : "color", barOneIdx: 0, barTwoIdx: i, color: "red"});
        animations.push({type : "swap", barOneIdx: 0, barTwoIdx: i});
        animations.push({type : "color", barOneIdx: 0, barTwoIdx: i, color: "lightblue"});
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0, animations);
    }

    return animations;
}

function heapify(arr, length, i, animations) {
    let largest = i;
    let l = 2 * i + 1;
    let r = l + 1;
    
    if (l < length && arr[l] > arr[largest]) {
        largest = l;
    }

    if (r < length && arr[r] > arr[largest]) {
        largest = r;
    }

    if (largest !== i) {
        //Highlight
        animations.push({type : "color", barOneIdx: i, barTwoIdx: largest, color: "red"});
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        // Move
        animations.push({type : "swap", barOneIdx: i, barTwoIdx: largest});
        //Un-Highlight
        animations.push({type : "color", barOneIdx: i, barTwoIdx: largest, color: "lightblue"});
        heapify(arr, length, largest, animations);
    }
    
    return arr;
}



export { heapSort };