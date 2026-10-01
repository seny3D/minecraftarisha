function EMethod(file) {
	var res = "";
	var c = 1
	for (var i = 1; i <= file.length; i++) {
		if (file[i-1] == file[i] && i < file.length) {
			c += 1
		}
		else {
			// WSH.Echo(file.slice(i-c,i));
			if (file[i-1] == "#") {
				res += "#" + (c) + file[i-1];
			}
			else if (c >= 4) {
				res += "#" + (c) + file[i-1];

			}
			else {
				for (var j = 0; j < c; j++) {
					res += file[i-1];
				}
			}
			// WSH.Echo(res);
			c = 1;
		}
	}
	return res;
}

function UNEMethod(file) {
	var res = "";
	var sk = 0;
	for (var i = 2; i <= file.length; i++) {
		if (sk > 0) {
			sk--;
			continue;
		}
		if (file[i-2] == "#" && file[i] != "#") {
			for (var j = 0; j < parseInt(file[i-1]); j++) {
				res += file[i];
			}
			sk = 2;
		}
		else if (file[i-2] == "#" && file[i] == "#") {
			for (var j = 0; j < parseInt(file[i-1]); j++) {
				res += file[i];
			}
			sk = 2;
		}

		else {
			res += file[i-2];

			if (i == file.length) {
				res += file[i-1];
			}
		}
		
	}
	return res;
}

function JMethod(file) {
	var res = "";
	var i = 0;

	while (i < file.length) {
		if (i + 1 < file.length && file.charAt(i) == file.charAt(i+1)) {
			var cl = file.charAt(i);
			var c =0;

			while (i < file.length && file.charAt(i) == cl && c < 127) {
				c += 1;
				i += 1;
			}

			res += String.fromCharCode(128 + c) + cl;
		}
		else {
			var a = "";

			while (i < file.length && a.length < 127) {
				if (i + 1 < file.length && file.charAt(i) == file.charAt(i+1)){
					break;
				}

				a += file.charAt(i);
				i += 1
			}
			res += String.fromCharCode(a.length) + a;
		}
	}
	return res;
}

function UNJMethod(file) {
	var res = "";
	var i = 0;

	while (i < file.length) {
		var a = file.charCodeAt(i);
		i += 1
		if (a > 127) {
			var c = a - 128;
			var bukva = file.charAt(i);

			for (var j = 0; j < c; j++) {
				res += bukva;
			}
			i += 1;
		}
		else {
			var c = a;
			res += file.substr(i, c);
			i += c;

		}
	}
	return res;
}


WSH.Echo("Добро пожаловать в RLE архиватор киборг фунт нагибатор х3000 pro max!");
WSH.Echo("На данный момент можно заархивировать тексты любым способом: JUMP(J) и ESCAPE(E)");
WSH.Echo("Для выбора метода напишите J или E");

var ch = WScript.StdIn.ReadLine();
// var test = "AAAAABBBCC####DDEEEEEEEEE";
var test = "AAAAABCDCDBBBB";
var fso = new ActiveXObject("Scripting.FileSystemObject")

var file = fso.CreateTextFile("st.txt", 1);
file.Writeline(test);
file.Close();

var text = fso.OpenTextFile("st.txt").ReadLine();

switch (ch) {

	case "J":
		WSH.Echo("Выбран метод JUMP, начинается работа");
		var cres = JMethod(test);
		var res = fso.CreateTextFile("JRes.txt",1);
		res.Writeline(cres);
		res.Close();
		var textres = fso.OpenTextFile("JRes.txt").ReadLine();

		var dcres = UNJMethod(cres);
		var res = fso.CreateTextFile("UNJRes.txt",1);
		res.Writeline(dcres);
		res.Close();
		var untextres = fso.OpenTextFile('UNJRes.txt').ReadLine();



		WSH.Echo("Исходный " + text);
		WSH.Echo("Зашифрованный " + textres);
		WSH.Echo("Дешифрованный " + untextres);
		WSH.Echo("Равны ли?: " + (text == untextres));

		break;
	
	case "E":
		WSH.Echo("Выбран метод ESCAPE, начинается работа");
		var cres = EMethod(test);
		var res = fso.CreateTextFile("JRes.txt",1);
		res.Writeline(cres);
		res.Close();
		var textres = fso.OpenTextFile("JRes.txt").ReadLine();

		var dcres = UNEMethod(cres);
		var res = fso.CreateTextFile("UNJRes.txt",1);
		res.Writeline(dcres);
		res.Close();
		var untextres = fso.OpenTextFile('UNJRes.txt').ReadLine();

		WSH.Echo("Исходный " + text);
		WSH.Echo("Зашифрованный " + textres);
		WSH.Echo("Дешифрованный " + untextres);
		WSH.Echo("Равны ли?: " + (text == untextres));
		break;

	default:
		WSH.Echo("Не выбран верный метод(J или E)");
		WSH.Echo("Перезапустите программу и выберите нормальный метод");
		break;		
}
