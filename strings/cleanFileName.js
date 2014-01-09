sb.include('strings.ucwords');

/**
 * @name sb.strings.cleanFileName
 * @author Paul Visco
 * @description Cleans a filename up making it safe for upload, removes spaces, 
 * switches to camelStyle and strips extraneos punctuation
 * @param {String} str The file name
 * @returns {string} replaces non acceptable file name chars
 * @function
 * @example 
 * sb.strings.cleanFileName('hello there,, file . jpg');
 * //newString = 'helloThereFile.jpg'
 */
sb.strings.cleanFileName = function(str) {
    var ext = str.match(/\.\w{2,3}$/);
    str = str.replace(/ext/, '');
    str = str.replace(/\.\w{2,3}$/, '');
    str = str.replace(/[^A-Z^a-z^0-9]+/g, ' ');
    str = sb.strings.ucwords(str.ucwords);

    str = str.replace(/ /g, '');
    str += String(ext).toLowerCase();
    return str;
};