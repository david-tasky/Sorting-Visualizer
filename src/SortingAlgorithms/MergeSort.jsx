///
/// Call MergeSort() and get animations
///
/// array-- > Array to be sorted
///
export function getMergeSortAnimations(array) {
    if (array.length <= 1) return array;

    const animations = [];
    const copiedArray = array.slice();
    mergeSort(array, 0, array.length - 1, copiedArray, animations);

    return animations;
}

/// 
/// The main function that implements MergeSort()
/// 1. Find the mid point to divide the array into two halves:
/// 2. Call mergeSort for first half
/// 3. Call mergeSort for second half:
/// 4. Merge the two halves sorted in step 2 and 3
///
/// mainArray-- > Array to be sorted
/// startIndex-- > Starting index
/// endIndex-- > Ending index
/// copiedArray-- > Copy of mainArray
/// animations-- > Array to capture animations
///
function mergeSort(mainArray, startIndex, endIndex, copiedArray, animations) {
    // Return if the same element
    if (startIndex === endIndex)
        return;

    // Find midpoint
    const midIndex = Math.floor((startIndex + endIndex) / 2);

    // Merge bottom half 
    mergeSort(copiedArray, startIndex, midIndex, mainArray, animations);
    // Merge top half
    mergeSort(copiedArray, midIndex + 1, endIndex, mainArray, animations);
    merge(mainArray, startIndex, midIndex, endIndex, copiedArray, animations);
}


///
/// Merges two subarrays of mainArray
/// First subarray is mainArray[startIndex..midIndex]
/// Second subarray is mainArray[midIndex+1..endIndex]
///
/// mainArray-- > Array to be sorted
/// startIndex-- > Starting index
/// midIndex-- > Middle index
/// endIndex-- > Ending index
/// copiedArray-- > Copy of mainArray
/// animations-- > Array to capture animations
///
function merge(mainArray, startIndex, midIndex, endIndex, copiedArray, animations) {
    // Initial index of first subarray
    let i = startIndex;
    // Initial index of second subarray
    let j = midIndex + 1;
    // Initial index of merged subarray
    let k = startIndex;

    while (i <= midIndex && j <= endIndex) {
        // These are the values that we're comparing; push them once to change their color
        animations.push([i, j]);
        // These are the values that we're comparing; push them a second time to revert their color
        animations.push([i, j]);
        if (copiedArray[i] <= copiedArray[j]) {
            // Overwrite the value at index k in the original array with the value at index i in 
            // the copiedArray array
            animations.push([k, copiedArray[i]]);
            mainArray[k++] = copiedArray[i++];
        }
        else {
            // Overwrite the value at index k in the original array with the value at index j in 
            // the copiedArray array
            animations.push([k, copiedArray[j]]);
            mainArray[k++] = copiedArray[j++];
        }
    }

    // Copy remaining elements of first subarray if there are any
    while (i <= midIndex) {
        // These are the values that we're comparing; push them once to change their color
        animations.push([i, i]);
        // These are the values that we're comparing; push them a second time to revert their color
        animations.push([i, i]);
        // Overwrite the value at index k in the original array with the value at index i in the 
        // copiedArray array
        animations.push([k, copiedArray[i]]);
        mainArray[k++] = copiedArray[i++];
    }

    // Copy remaining elements of second subarray if there are any
    while (j <= endIndex) {
        // These are the values that we're comparing; push them once to change their color
        animations.push([j, j]);
        // These are the values that we're comparing; push them a second time to revert their color
        animations.push([j, j]);
        // Overwrite the value at index k in the original array with the value at index j in the 
        // copiedArray array
        animations.push([k, copiedArray[j]]);
        mainArray[k++] = copiedArray[j++];
    }
}