function insertionSort(arr) {
    const animations = [];
    let n = arr.length;

    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            animations.push({type : "color", barOneIdx: j, barTwoIdx: j + 1, color: "#ea4335"});
            animations.push({type : "swap", barOneIdx: j, barTwoIdx: j + 1});
            arr[j + 1] = arr[j];
            animations.push({type : "color", barOneIdx: j, barTwoIdx: j + 1, color: "lightblue"});
            j--;
        }
        arr[j + 1] = key;
        animations.push({type : "color", barOneIdx: j + 1, barTwoIdx: j + 1, color: "lightblue"});
    }

    return animations;
}

export { insertionSort };