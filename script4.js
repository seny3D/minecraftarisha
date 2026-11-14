// у нас есть некоторая строка и мы хотим посчитать энтропию шенона, откуда они берутся, что за вероятности? это количество повторов "abcadeafg" - отношение количества повторения каждого символа строки деленое на длину всей строки
// во первых надо составить алфавит 
// посчитать кол-во вхождений каждого символа(частоту)
// вероятность - частота/длину
function shenon(ver) {
    var entrop = 0;
    var ln2 = Math.log(2);
    for (var i = 0; i < ver.length; i++) {
        var v = ver[i];

        if (v > 0) {
            var log2v = Math.log(v) / ln2;
            entrop -= v * log2v;
        }
    }

    
    var mx = Math.log(ver.length) / ln2;
    if (mx == 0) { return 0;}
    else {
        return entrop / mx; }
}
// var data = [0];
// WSH.Echo(shenon(data))
function findver(text) {
    var len = text.length;
    var dict = new ActiveXObject("Scripting.Dictionary");

    for (var i = 0; i < len; i++) {
        var char = text.charAt(i);
        if (dict.Exists(char)) {
            dict.Item(char,dict.Item(char) + 1); 
        }
        else {
            dict.Add(char,1);
        }

    }
    var ver = [];
    for (var char in dict.items) {
        var cnt = dict.items[char];
        ver.push(cnt / len);
    }
    return ver;
}

var test = "a";
// WSH.Echo(findver(test));
WSH.Echo(shenon(findver(test)));