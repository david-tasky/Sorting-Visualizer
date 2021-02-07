/// 
/// Call BubbleSort() and get animations
///
/// array-- > Array to be sorted
///
export function getBubbleSortAnimations(array) {
    if (array.length <= 1) return array;

    const animations = [];
    bubbleSort(array, animations);

    return animations;
}

///
/// The main function that implements BubbleSort()
///
/// mainArray-- > Array to be sorted
/// animations-- > Array to capture animations
///
function bubbleSort(mainArray, animations) {
    const n = mainArray.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (mainArray[j] > mainArray[j + 1]) {
                // swap arr[j] and arr[j+1] 
                animations.push([j, j + 1]);
                animations.push([j, j + 1]);
                animations.push([j, mainArray[j + 1]]);
                animations.push([j + 1, mainArray[j]]);
                const temp = mainArray[j];
                mainArray[j] = mainArray[j + 1];
                mainArray[j + 1] = temp;
                swapped = true;
            }
        }

        // IF no two elements were swapped by inner loop, then break 
        if (swapped === false)
            break;
    } 
}