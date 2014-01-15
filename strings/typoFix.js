/**
 * @name sb.strings.typoFix
 * @description Fixes common typos in a string
 * @param {String} str The string to fix
 * @return {String} Orig string without common typos
 * @function
 * @example
 * sb.strings.typoFix('teh Teh didn;t');
 * //'hello world'
 */
sb.strings.typoFix = function(txt) {
    sb.strings.typoFix.typos.forEach(function(v) {
        txt = txt.replace(new RegExp(v[0], 'g'), v[1]);
    });

    txt = txt.replace("n;t", "n't");
    return txt;
};

/**
 * @name sb.strings.typoFix.typos
 * @description An array of common typos. Used internally
 * @type {Array}
 */
sb.strings.typoFix.typos = [
    ["adn", "and"],
    ["agian", "again"],
    ["ahve", "have"],
    ["ahd", "had"],
    ["alot", "a lot"],
    ["amke", "make"],
    ["arent", "aren't"],
    ["beleif", "belief"],
    ["beleive", "believe"],
    ["broswer", "browser"],
    ["cant", "can't"],
    ["cheif", "chief"],
    ["couldnt", "couldn't"],
    ["comming", "coming"],
    ["didnt", "didn't"],
    ["doesnt", "doesn't"],
    ["dont", "don't"],
    ["ehr", "her"],
    ["esle", "else"],
    ["eyt", "yet"],
    ["feild", "field"],
    ["goign", "going"],
    ["hadnt", "hadn't"],
    ["hasnt", "hasn't"],
    ["hda", "had"],
    ["hed", "he'd"],
    ["hel", "he'll"],
    ["heres", "here's"],
    ["hes", "he's"],
    ["hers", "her's"],
    ["hows", "how's"],
    ["hsa", "has"],
    ["hte", "the"],
    ["htere", "there"],
    ["i'll", "I'll"],
    ["infromation", "information"],
    ["i'm", "I'm"],
    ["isnt", "isn't"],
    ["itll", "it'll"],
    ["itsa", "its a"],
    ["ive", "I've"],
    ["mkae", "make"],
    ["peice", "piece"],
    ["seh", "she"],
    ["shouldnt", "shouldn't"],
    ["shouldve", "should've"],
    ["shoudl", "should"],
    ["somethign", "something"],
    ["taht", "that"],
    ["tahn", "than"],
    ["Teh", "The"],
    ["teh", "the"],
    ["thier", "their"],
    ["weve", "we've"],
    ["workign", "working"]
];