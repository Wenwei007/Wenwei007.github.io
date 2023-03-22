var text1 = "-02";
var num1 = text1.length;
var a = 0;

function show1() {
    var shower1 = text1.substr(0, a);
    document.getElementById("test1").innerHTML = shower1;
    a++;
    if (a + 1 >= num1) {
        clearInterval("done1");
    }
}
var done1 = setInterval("show1()", 20);

///////////////////
var text2 = "SHOPPING OF TOMORROW";
var num2 = text2.length;
var i = 0;

function show2() {
    var shower2 = text2.substr(0, i);
    document.getElementById("test2").innerHTML = shower2;
    i++;
    if (i + 1 >= num2) {
        clearInterval("done2");
    }
}
var done2 = setInterval("show2()", 20);