function quickSort(arr) {
    const animations = [];
    let length = arr.length;

    sort(arr, 0, length - 1, animations);

    console.log(arr);

    return animations;
}

function sort(arr, low, high, animations) {
    if (arr.length > 1) {
        let index = partition(arr, low, high, animations);
        if (low < index - 1) {
            sort(arr, low, index - 1, animations);
        }
        if (index < high) {
            sort(arr, index, high, animations);
        }
    }
}

function partition(arr, low, high, animations) {
    const pivot = arr[Math.floor((high + low) / 2)];

    while (low <= high) {
        while (arr[low] < pivot) {
            low++;
        }
        while (arr[high] > pivot) {
            high--;
        }
        if (low <= high) {
            animations.push({type : "color", barOneIdx: low, barTwoIdx: high, color: "#ea4335"});
            animations.push({type : "swap", barOneIdx: low, barTwoIdx: high});
            animations.push({type : "color", barOneIdx: low, barTwoIdx: high, color: "lightblue"});
            [arr[low], arr[high]] = [arr[high], arr[low]];
            low++;
            high--;
        }
    }
    return low;
}

export { quickSort };