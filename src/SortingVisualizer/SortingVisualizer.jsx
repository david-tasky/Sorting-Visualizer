import React from 'react';
import { getMergeSortAnimations } from '../SortingAlgorithms/MergeSort.jsx';
import { getQuickSortAnimations } from '../SortingAlgorithms/QuickSort.jsx';
import { getHeapSortAnimations } from '../SortingAlgorithms/HeapSort.jsx';
import { getBubbleSortAnimations } from '../SortingAlgorithms/BubbleSort.jsx';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;
// This is the main color of the array bars.
const PRIMARY_COLOR = 'CornflowerBlue';
// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'magenta';

// Classnames values
const BUTTON_CLASSNAME = 'toolbar-button';
const BUTTON_CLICKED_CLASSNAME = 'toolbar-button-click';
const LOCKED_BUTTON_CLASSNAME = 'locked-button-click';
const UNCLICKABLE_CLASSNAME = 'unclickable-text';
const ARRAY_CLASSNAME = 'array-bar';

// Button id values
const GENERATE = 'generate';
const MERGESORT = 'mergeSort';
const QUICKSORT = 'quickSort';
const HEAPSORT = 'heapSort';
const BUBBLESORT = 'bubbleSort';
const SEPARATOR = 'separator';
const SORT = 'sort';

export default class SortingVisualizer extends React.Component {
    ///
    /// Constructor
    /// 
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            currSelection: '',
            prevSelection: '',
            numArrayBars: 52,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    ///
    /// Invoked immediately after a component is mounted. Reset the array here
    ///
    componentDidMount() {
        this.resetArray();
    }

    ///
    /// Repopulate the array that is displayed with random values
    ///
    resetArray() {
        const newArray = [];
        for (let i = 0; i < this.state.numArrayBars; i++) {
            newArray.push(randomIntFromInterval(5, 650));
        }
        this.setState({ array: newArray });
    }

    ///
    /// Update the array based on the slider
    ///
    handleChange(event) {
        // Get the value from the slider
        let newArrayBars = event.target.value;
        // Set the numArrayBars state and call reset Array with new value
        this.setState({ numArrayBars: newArrayBars }, () => { this.resetArray() });
    }

    ///
    /// Set the selection and color when user clicks on a sort option
    ///
    setSelection(param) {
        this.setState({ currSelection: param });
        document.getElementById(param).className = BUTTON_CLICKED_CLASSNAME;

        if (this.state.prevSelection !== '' && this.state.prevSelection !== param) {
            document.getElementById(this.state.prevSelection).className = BUTTON_CLASSNAME;
        }

        this.setState({ prevSelection: param })
    }

    ///
    /// Logic for what happens when the sort button is clicked
    ///
    toggleSortButton(time) {
        if (document.getElementById(SORT).className === BUTTON_CLASSNAME) {
            // Lock the sort and generate buttons
            document.getElementById(SORT).className = LOCKED_BUTTON_CLASSNAME;
            document.getElementById(GENERATE).className = LOCKED_BUTTON_CLASSNAME;
        }
        else {
            // Unlock the sort and generate buttons after the specified time
            setTimeout(() => {
                document.getElementById(SORT).className = BUTTON_CLASSNAME;
                document.getElementById(GENERATE).className = BUTTON_CLASSNAME;
            },
                time);
        }
    }

    ///
    /// Call the appropriate sort function
    ///
    sort() {
        let time = 0;
        this.toggleSortButton(time);

        switch (this.state.currSelection) {
            case MERGESORT:
                time = this.mergeSort();
                break;
            case QUICKSORT:
                time = this.quickSort();
                break;
            case HEAPSORT:
                time = this.heapSort();
                break;
            case BUBBLESORT:
                time = this.bubbleSort();
                break;
            default:
                break;
        }

        this.toggleSortButton(time);
    }

    ///
    /// Call mergeSort and get the animations to display 
    ///
    mergeSort() {
        // Perform mergeSort on array
        const animations = getMergeSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            // Get the array bars that are graphically displayed
            const arrayBars = document.getElementsByClassName(ARRAY_CLASSNAME);

            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }

        return (animations.length * ANIMATION_SPEED_MS);
    }

    quickSort() {
        // Perform quickSort on array
        const animations = getQuickSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            // Get the array bars that are graphically displayed
            const arrayBars = document.getElementsByClassName(ARRAY_CLASSNAME);

            const isColorChange = (i % 4 !== 2) && (i % 4 !== 3);
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }

        return (animations.length * ANIMATION_SPEED_MS);
    }

    heapSort() {
        // Perform heapSort on array
        const animations = getHeapSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            // Get the array bars that are graphically displayed
            const arrayBars = document.getElementsByClassName(ARRAY_CLASSNAME);

            const isColorChange = (i % 4 !== 2) && (i % 4 !== 3);
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }

        return (animations.length * ANIMATION_SPEED_MS);
    }

    bubbleSort() {
        // Perform heapSort on array
        const animations = getBubbleSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            // Get the array bars that are graphically displayed
            const arrayBars = document.getElementsByClassName(ARRAY_CLASSNAME);

            const isColorChange = (i % 4 !== 2) && (i % 4 !== 3);
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }

        return (animations.length * ANIMATION_SPEED_MS);
    }  

    ///
    /// Responsible for what is displayed
    ///
    render() {
        const array = this.state.array;

        return (
            <div id="parent">
                <div id="toolbar-container">
                    <div id={GENERATE} className={BUTTON_CLASSNAME} onClick={() =>
                        this.resetArray()}> Generate New Array</div>
                    <div id={SEPARATOR} />
                    <div className={UNCLICKABLE_CLASSNAME}> Change Array Size </div>
                    <input id="changeSize" type="range" min="4" max="100"
                        value={this.state.numArrayBars} onChange={this.handleChange} />
                    <div id={SEPARATOR} />
                    <div id={MERGESORT} className={BUTTON_CLASSNAME} onClick={() =>
                        this.setSelection(MERGESORT)}>Merge Sort</div>
                    <div id={QUICKSORT} className={BUTTON_CLASSNAME} onClick={() =>
                        this.setSelection(QUICKSORT)}>Quick Sort</div>
                    <div id={HEAPSORT} className={BUTTON_CLASSNAME} onClick={() =>
                        this.setSelection(HEAPSORT)}>Heap Sort</div>
                    <div id={BUBBLESORT} className={BUTTON_CLASSNAME} onClick={() =>
                        this.setSelection(BUBBLESORT)}>Bubble Sort</div>
                    <div id={SEPARATOR} />
                    <div id={SORT} className={BUTTON_CLASSNAME} onClick={() =>
                        this.sort()}>Sort!</div>
                </div>
                <div id="array-container">
                    {array.map((value, idx) => (
                        <div
                            className={ARRAY_CLASSNAME}
                            key={idx}
                            style={{
                                height: `${value}px`,
                            }}>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

///
/// Generate a random integer between two values
///
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}