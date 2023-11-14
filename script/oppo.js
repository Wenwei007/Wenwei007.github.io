var text1 = "- 02";
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
var done1 = setInterval("show1()", 30);

///////////////////
var text2 = "SHOPPING OF";
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
var done2 = setInterval("show2()", 30);

///////////////////
var text3 = "TOMORROW";
var num3 = text3.length;
var b = 0;

function show3() {
    var shower3 = text3.substr(0, b);
    document.getElementById("test3").innerHTML = shower3;
    b++;
    if (b + 1 >= num3) {
        clearInterval("done3");
    }
}
var done3 = setInterval("show3()", 50);

///////////////////
var text4 = "Work with OPPO ";
var num4 = text4.length;
var b = 0;

function show4() {
    var shower4 = text4.substr(0, b);
    document.getElementById("green-test4").innerHTML = shower4;
    b++;
    if (b + 1 >= num4) {
        clearInterval("done4");
    }
}
var done4 = setInterval("show4()", 30);

///////////////////
var text5 = "Project timeline Sep - Dec 2019";
var num5 = text5.length;
var b = 0;

function show5() {
    var shower5 = text5.substr(0, b);
    document.getElementById("green-test5").innerHTML = shower5;
    b++;
    if (b + 1 >= num5) {
        clearInterval("done5");
    }
}
var done5 = setInterval("show5()", 30);


$(document).ready(function() {
    adjustBackgroundHeight();
    $(window).resize(adjustBackgroundHeight);

    function adjustBackgroundHeight() {
        var imgHeight = $("#background-intro-img2").height();
        $(".background").height(imgHeight + 20); // 加20是为了考虑到图片上方的margin-top
    }
});