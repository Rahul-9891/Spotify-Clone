console.log('HI login');


function fu () {
var nam = document.forms['myForm']['fname'].value;
if (nam.length<5){
    alert("Enter the correct name")
}

var num = document.forms['myForm']['fmobile'].value;
if (num.length>10 || num.length<10){
    alert("Enter the correct Number")
}

var ema = document.forms['myForm']['femail'].value;
if (ema.length>18){
    alert("Enter the correct Email")
}


}
