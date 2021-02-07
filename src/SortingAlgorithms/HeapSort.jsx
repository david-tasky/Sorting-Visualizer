/// 
/// Call HeapSort() and get animations
///
/// array-- > Array to be sorted
///
export function getHeapSortAnimations(array) {
    if (array.length <= 1) return array;

    const animations = [];
    heapSort(array, animations);

    return animations;
}

///
/// The main function that implements HeapSort()
///
/// mainArray-- > Array to be sorted
/// animations-- > Array to capture animations
///
function heapSort(mainArray, animations) {
    const n = mainArray.length;

    // Build heap (rearrange array)
    for (let i = ((n / 2) - 1); i >= 0; i--) {
        heapify(mainArray, n, parseInt(i), animations);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        animations.push([0, i]);
        animations.push([0, i]);
        animations.push([0, mainArray[i]]);
        animations.push([i, mainArray[0]]);
        const temp = mainArray[0];
        mainArray[0] = mainArray[i];
        mainArray[i] = temp;

        // call max heapify on the reduced heap
        heapify(mainArray, i, 0, animations);
    }
}

///
/// To heapify a subtree rooted with node i which is an index in mainArray[]. n is size of heap
///
///
/// mainArray-- > Array to be sorted
/// n-- > Size of heap
/// i-- > Node subtree is rooted with
/// animations-- > Array to capture animations
///
function heapify(mainArray, n, i, animations) {
    // Initialize largest as root
    let largest = i; 
    // left = 2*i + 1
    const l = 2 * i + 1; 
    // right = 2*i + 2
    const r = 2 * i + 2; 

    // If left child is larger than root
    if (l < n && mainArray[l] > mainArray[largest])
        largest = l;

    // If right child is larger than largest so far
    if (r < n && mainArray[r] > mainArray[largest])
        largest = r;

    // If largest is not root
    if (largest !== i) {
        animations.push([i, largest]);
        animations.push([i, largest]);
        animations.push([i, mainArray[largest]]);
        animations.push([largest, mainArray[i]]);
        const swap = mainArray[i];
        mainArray[i] = mainArray[largest];
        mainArray[largest] = swap;

        // Recursively heapify the affected sub-tree
        heapify(mainArray, n, largest, animations);
    }
}