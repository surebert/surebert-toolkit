/**
 * @name sb.strings.substrCount
 * @description Find the numbers of times a substring is found in a string
 * @param {String} haystack The string to search within
 * @param {String} needle The substring to count within the string
 * @return {Number} The number of times the substring is found in the original string
 * @function
 * @example
 * myString.substrCount('world');
 * //answer = 1;
 */
sb.strings.substrCount = function(haystack, needle) {
    var cnt = 0;
    for (var i = 0; i < haystack.length; i++) {
        if (needle == haystack.substr(i, needle.length))
            cnt++;
    }
    return cnt;
};