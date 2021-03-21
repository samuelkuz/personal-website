function mergeSort(arr) {
    const animations = [];
    let length = arr.length;

    sort(arr, 0, length - 1, animations);

    return animations;
}

function sort(arr, left, right, animations) {
    if (left < right) {
        const mid = Math.floor(left + (right - left) / 2);

        sort(arr, left, mid, animations);
        sort(arr, mid + 1, right, animations);

        merge(arr, left, mid, right, animations);
    }
}

function merge(arr, left, mid, right, animations) {
    const length1 = mid - left + 1;
    const length2 = right - mid;

    const tempL = [];
    const tempR = [];

    for (let i = 0; i < length1; i++) {
        tempL.push(arr[left + i]);
    }
    for (let j = 0; j < length2; j++) {
        tempR.push(arr[mid + 1 + j]);
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (i < length1 && j < length2) {
        animations.push({type : "color", barOneIdx: left + i, barTwoIdx: mid + 1 + j, color: "#ea4335"});
        if (tempL[i] <= tempR[j]) {
            arr[k] = tempL[i];
            animations.push({type : "insert", barIdx: k, value: tempL[i]});
            animations.push({type : "color", barOneIdx: left + i, barTwoIdx: mid + 1 + j, color: "lightblue"});
            i++;
        } else {
            arr[k] = tempR[j];
            animations.push({type : "insert", barIdx: k, value: tempR[j]});
            animations.push({type : "color", barOneIdx: left + i, barTwoIdx: mid + 1 + j, color: "lightblue"});
            j++;
        }
        k++;
    }

    while (i < length1) {
        arr[k] = tempL[i];
        animations.push({type : "insert", barIdx: k, value: tempL[i]});
        i++;
        k++;
    }

    while (j < length2) {
        arr[k] = tempR[j];
        animations.push({type : "insert", barIdx: k, value: tempR[j]});
        j++;
        k++;
    }

}

export { mergeSort };