function heapSort(arr) {
    let length = arr.length;

    for (let i = Math.floor((length / 2 ) - 1); i >= 0; i--) {
        heapify(arr, length, i);
    }

    for (let i = length - 1; i > 0; i--) {
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }

    return arr;
}

function heapify(arr, length, i) {
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
        [arr[i], arr[largest]] = [arr[largest], arr[i]];

        heapify(arr, length, largest);
    }
    
    return arr;
}



export { heapSort };