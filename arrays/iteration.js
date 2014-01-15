/**
 * @name sb.arrays.iteration
 * @author Paul Visco
 * @description Can be used to iterate arrays with next, rewind, forward,
 * @param {Array} arr The orig array
 * @returns {Array} The array to be iterated
 * @function
 * @example 
 * sb.arrays.iteration(arr);
 */
sb.arrays.addIteration = function(arr) {
    if (arr.pointer === null) {
        arr.pointer = 0;
    }
    return arr;
};

/**
 * @name sb.arrays.current
 * @author Paul Visco
 * @description Returns the array value of the current key.
 * @param {Array} arr The orig array
 * @returns {*} The current value based on the pointer
 * @function
 * @example 
 * sb.arrays.end(arr);
 */
sb.arrays.current = function(arr) {
    arr = this.addIteration(arr);
    return arr[arr.pointer];
};

/**
 * @name sb.arrays.end
 * @author Paul Visco
 * @description Returns the array value of the last key and sets the array's pointer to that key
 * @param {Array} arr The orig array
 * @returns {*} The end value
 * @function
 * @example 
 * sb.arrays.end(arr);
 */
sb.arrays.end = function(arr) {
    arr = this.addIteration(arr);
    arr.pointer = arr.length - 1;
    return arr[arr.pointer];
};

/**
 * @name sb.arrays.first
 * @author Paul Visco
 * @description Returns the first value of the array without moving the pointer.
 * @param {Array} arr The orig array
 * @returns {*} The first value
 * @function
 * @example 
 * sb.arrays.first(arr);
 */
sb.arrays.first = function(arr) {
    arr = this.addIteration(arr);
    return arr[0];
};

/**
 * @name sb.arrays.last
 * @author Paul Visco
 * @description Returns the last value of the array without moving the pointer.
 * @param {Array} arr The orig array
 * @returns {*} The last value
 * @function
 * @example 
 * sb.arrays.last(arr);
 */
sb.arrays.last = function(arr) {
    arr = this.addIteration(arr);
    return arr[arr.length - 1];
};

/**
 * @name sb.arrays.next
 * @author Paul Visco
 * @description Returns the next value of the array and moves the pointer forward to it.
 * @param {Array} arr The orig array
 * @returns {*} The next value
 * @function
 * @example 
 * sb.arrays.next(arr);
 */
sb.arrays.next = function(arr) {
    arr = this.addIteration(arr);
    arr.pointer += 1;
    return arr[arr.pointer];
};

/**
 * @name sb.arrays.rewind
 * @author Paul Visco
 * @description Returns the first value of the array and moves the pointer back to the beginning.
 * @param {Array} arr The orig array
 * @returns {*} The previous value
 * @function
 * @example 
 * sb.arrays.rewind(arr);
 */
sb.arrays.rewind = function(arr) {
    arr = this.addIteration(arr);
    arr.pointer = 0;
    return arr[arr.pointer];
};

/**
 * @name sb.arrays.prev
 * @author Paul Visco
 * @description Returns the next value of the array and moves the pointer forward to it.
 * @param {Array} arr The orig array
 * @returns {*} The previous value
 * @function
 * @example 
 * sb.arrays.prev(arr);
 */
sb.arrays.prev = function(arr) {
    arr =  this.addIteration(arr);
    arr.pointer -= 1;
    return arr[arr.pointer];
};

/**
 * @name sb.arrays.cycle
 * @author Paul Visco
 * @description Cycles through an array by incrememtning its pointer and reseting it back to the beginng (0) when it gets to the end.
 * @param {Array} arr The orig array
 * @param {Number} direction Accepts either 1 for ascending order or -1 for decending order. If not specified that ascending order is the default. 
 * @returns {Number} The average value
 * @function
 * @example 
 * sb.arrays.cycle(arr);
 */
sb.arrays.cycle = function(arr, direction) {

    var val, d = direction;
    arr =  this.addIteration(arr);
    if (!arr.sb_beginCycle) {
        arr.sb_beginCycle = 1;
        if (d) {
            val = arr.last();
        } else {
            val = arr.first();
        }
    } else {
        if (d) {
            val = arr.prev();
        } else {
            val = arr.next();
        }

    }

    if (typeof val == 'undefined') {

        if (d) {
            return arr.end();
        } else {
            return arr.rewind();
        }
    } else {
        return val;
    }
};