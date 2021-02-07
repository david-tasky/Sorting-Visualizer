/// 
/// Call QuickSort() and get animations
///
/// array-- > Array to be sorted
///
export function getQuickSortAnimations(array) {
    if (array.length <= 1) return array;

    const animations = [];
    quickSort(array, 0, array.length - 1, animations);

    return animations;
}

///
/// The main function that implements QuickSort() 
///
/// mainArray-- > Array to be sorted
/// lowIndex-- > Starting index
/// highIndex-- > Ending index
/// animations-- > Array to capture animations
///
function quickSort(mainArray, lowIndex, highIndex, animations) {
    if (lowIndex < highIndex) {
        // Find partition index
        const partitionIndex = partition(mainArray, lowIndex, highIndex, animations);

        // Before partition index
        quickSort(mainArray, lowIndex, partitionIndex - 1, animations);
        // After partition index
        quickSort(mainArray, partitionIndex + 1, highIndex, animations);
    }
}

///
/// This function takes last element as pivot, places the pivot element at its correct position in 
/// sorted array, and places all smaller(smaller than pivot) to left of pivot and all greater 
/// elements to right of pivot
///
///
/// mainArray-- > Array to be sorted
/// lowIndex-- > Starting index
/// highIndex-- > Ending index
/// animations-- > Array to capture animations
///
function partition(mainArray, lowIndex, highIndex, animations) {
    // pivot (Element to be placed at right position)
    const pivot = mainArray[highIndex];

    // index of smaller element 
    let i = (lowIndex - 1); 

    for (let j = lowIndex; j < highIndex; j++)
    {
        // These are the values that we're comparing; push them once to change their color
        animations.push([j, highIndex]);
        // These are the values that we're comparing; push them a second time to revert their color
        animations.push([j, highIndex]);

        // If current element is smaller than the pivot 
        if (mainArray[j] < pivot) {
            i++;

            // swap arr[i] and arr[j] 
            animations.push([i, mainArray[j]]);
            animations.push([j, mainArray[i]]);
            const temp = mainArray[i];
            mainArray[i] = mainArray[j];
            mainArray[j] = temp;
        }
        else {
            // Do nothing
            animations.push([j, mainArray[j]]);
            animations.push([j, mainArray[j]]);
        }
    }

    // swap arr[i+1] and arr[high] (or pivot) 
    animations.push([i + 1, highIndex]);
    animations.push([i + 1, highIndex]);
    animations.push([i + 1, mainArray[highIndex]]);
    animations.push([highIndex, mainArray[i+1]]);
    const temp = mainArray[i + 1];
    mainArray[i + 1] = mainArray[highIndex];
    mainArray[highIndex] = temp;

    return (i + 1); 
}