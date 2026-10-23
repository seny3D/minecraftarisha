WSH.Echo("Система виртуал бобо запущена");

var MEMORY = 500;
var mem = Array(MEMORY);

for (var i = 0; i < MEMORY; i++) {
    mem[i] = 0;
}

var ip = 0; // адрес текущей комманды
var accumulator = 0; // это короче че то типо экрана вычислений 

function debug() {
    WScript.Echo(cmd, "текущая команад, ", "а также значение аккумулятор ", accumulator);
    // WScript.Echo(accumulator, " ", "аккумулятор");
}
// debug();
function executor(cmd) {
    // debug();
    if (!cmd || cmd == 0) {
        ip++;
        return true; 
    }

    var cmds = cmd.split(" ");
    var txt = cmds[0];
    var digit = parseInt(cmds[1], 10);

    // if (txt != "HALT") {
    // WSH.Echo(txt, digit);
    // }

    switch (txt) {

        case "INPUT":
            var a = parseInt(WScript.StdIn.ReadLine().replace(/^\s+|\s+$/g, ""),10);
            mem[digit] = a;
            ip++;    
            break;  
        
        case "LOAD":
            var k = mem[digit];
            accumulator = k;
            ip++;
            break;
        case "ADD":
            accumulator += mem[digit];
            ip++
            break;
        case "SUB":
            accumulator -= mem[digit];
            ip++
            break;
        case "JUMP":
            ip = digit;
            break;
        case "JNZ":
            if (accumulator != 0) {
                ip = digit;
                break;
            }
            ip++;
            break;   
        case "JPL":
            if (accumulator > 0) {
                ip = digit;
                break;
            }
            ip++;
            break;
        case "STORE":
            mem[digit] = accumulator;
            ip++;
            break;
        case "OUTPUT":
            WSH.Echo("ПОЛУЧЕГ РЕЗУЛЬАТ в ячейке ", digit)
            WSH.Echo(digit, " ", mem[digit]);
            ip++;
            break;
        case "HALT":
            return false;
        default: 
            WScript.Echo("не та команда");
            return false;
    }
    return true;
}

// executor("INPUT 2");
// WSH.Echo(mem);

function loading(fname) {

    var lbl = {};
    var fso = new WScript.ActiveXObject("Scripting.FileSystemObject");
    var files = fso.OpenTextFile(fname, 1, false, 0); 
    var schet = 0;

    var fulltxt = files.ReadAll();
    files.Close();

    var lns = fulltxt.split(/\r?\n/);

    for (var i = 0; i < lns.length; i++) {
        var ln = lns[i].replace(/^\s+|\s+$/g, "");
        if (ln === "") {continue;}

        if (ln.slice(-1) == ":") {
            var namelbl = ln.slice(0,-1);
            // WSH.Echo(namelbl);
            lbl[namelbl] = schet;
            continue;
        }
        schet++;
    }

    var memwrite = 0;

    for (var i = 0; i < lns.length; i++) {
        var ln = lns[i].replace(/^\s+|\s+$/g, "");

        if (ln == "") {continue;}

        if (ln.slice(-1) == ":") {continue;}

        var cname = ln.split(" ")[0];
        var cdig = ln.split(" ")[1];

        if (cdig && lbl[cdig] != undefined) {
            ln = cname + " " + lbl[cdig];
        } // этл короче проверка на E метки
        // WSH.Echo(cname, " ", cdig); Допустим INPUT 100

        mem[memwrite] = ln;
        memwrite++;
    }
    
    // while (!files.AtEndOfStream) {
    //     WSH.Echo(1);
    //     var ln = files.ReadLine();
    //     ln = ln.replace(/^\s+|\s+$/g, "");
    //     // WSH.Echo(ln);
    //     if (ln === "") {
    //         continue; 
    //     }
    //     mem[schet] = ln;
    //     schet++;
    // }

    // files.Close();
    WSH.Echo("прога ", fname, " в памяти", " всего ", memwrite, " команд");

}
loading(WSH.StdIn.ReadLine());
while (true) {
    var cmd = mem[ip];

    var isrun = executor(cmd);

    if (!isrun) {
        break;
    }
}
// WSH.Echo(mem)


// факториал вычисляется методом циклического умножения, тоесть например 3! берет 1, прибавляет ее 2 раза, а потом уже прибавляет двойку 3 раза -> 6
/*
Программа факториал(1+1+2+2 = 3!)
(5! = 1+1+2+2+6+6+6+24+24+24+24) и тд 
Умножаетсся короче поочередно от 1 до n, единичкав начале дается как старт для факториала, так как если 0+0, то никогда не завершится программа
Умножение как отдельная операция не сделана, поэтмоу расписана как созданный цикл ADL
Сама операция факторила расписывается в "функици" FL:
А "функция" CNF подгаталивает множители к операции умножения и записывет 0 во временную переменную чтобы умножить n-ое кол-во раз

*/
/*
Программа нод посути алгоритм евклди реализованный 
CYCLE просто проверет равенство двух чисел и если они равны то НоОд найден и программа останавливается
GREAT простыми словами определляет какое из 2 чисе больше и уж
если первое ичсло больше тогда идем в AG и сохраняем в 100
если меньше то (101-100) и сохраняем в 101 не переходя в AG
*/