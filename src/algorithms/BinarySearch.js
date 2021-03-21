function binarySearch(arr, find) {
    const animations = [];
    let length = arr.length;

    search(arr, 0, length - 1, find, animations);

    return animations;
}

function search(arr, l, r, find, animations) {
    if (r >= l) {
        const mid = Math.floor(l + ((r - l) / 2));

        animations.push({type : "color", barOneIdx: l, barTwoIdx: r, color: "#ea4335"});
        animations.push({type : "color", barOneIdx: mid, barTwoIdx: mid, color: "#f9ab00"});
        
        if (find === arr[mid]) {
            animations.push({type : "color", barOneIdx: mid, barTwoIdx: mid, color: "lightgreen"});
            if (mid !== l || mid !== r) {
                if (mid !== l && mid !== r) {
                    animations.push({type : "color", barOneIdx: l, barTwoIdx: r, color: "lightblue"});
                } else {
                    if (mid === l) {
                        animations.push({type : "color", barOneIdx: r, barTwoIdx: r, color: "lightblue"});
                    } else {
                        animations.push({type : "color", barOneIdx: l, barTwoIdx: l, color: "lightblue"});
                    } 
                }
            }

            return mid;
        }
        if (find < arr[mid]) {
            animations.push({type : "color", barOneIdx: l, barTwoIdx: r, color: "lightblue"});
            animations.push({type : "color", barOneIdx: mid, barTwoIdx: mid, color: "lightblue"});
            search(arr, l, mid - 1, find, animations);
        } else {
            animations.push({type : "color", barOneIdx: l, barTwoIdx: r, color: "lightblue"});
            animations.push({type : "color", barOneIdx: mid, barTwoIdx: mid, color: "lightblue"});
            search(arr, mid + 1, r, find, animations);
        }
    }

    return -1;
}

export { binarySearch };