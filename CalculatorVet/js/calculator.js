//---Getting elements---
const mode = document.getElementById("mode");
const display = document.getElementById("display");

//---Event listeners---
document.addEventListener("keydown", keyPressed);
//document.addEventListener("click", clickPressed);

//---Main functions---
var modeOption = 0;
var step = 0;
var value1, value2, value3 =  "";

//>>Keyboard
function keyPressed(event){
    if(event.key === "Enter"){
        calculate();
    }
    if(enterData){
        switch(event.key){
            case "0":
                display.value += "0";
                break;
            case "1":
                display.value += "1";
                break;
            case "2":
                display.value += "2";
                break;
            case "3":
                display.value += "3";
                break;
            case "4":
                display.value += "4";
                break;
            case "5":
                display.value += "5";
                break;
            case "6":
                display.value += "6";
                break;
            case "7":
                display.value += "7";
                break;
            case "8":
                display.value += "8";
                break;
            case "9":
                display.value += "9";
                break;
            case ".":
                display.value += ".";
                break;
            case "+":
                display.value += "+";
                break;
            case "-":
                display.value += "-";
                break;
            case "*":
                display.value += "*";
                break;
            case "/":
                display.value += "/";
                break;
            case "Backspace":
                backspace();
                break;
            case "Delete":
                restart();
                break;
            case "p":
                percentage();
            break;
            case "r":
                racing();
        }
    }
}
function backspace(){
    display.value = display.value.toString().slice(0,-1)
}
function restart(){
    mode.value = "";
    display.value = "";
}
function calculate(){
    if(display.value !=="")
    {
        if(modeOption===0){
        mode.value = display.value + " =";
        display.value = eval(display.value);
        }
        if(modeOption===1){
            //Fallas en: manejo de números negativos
            console.log("percentage step: " + step);
            if(step === 3){
                mode.value = "";
                modeOption = 0;
                value1, value2 = "";
                //step = 0;
                console.log("modeOption RESET: " + modeOption);
            }
            if(step === 2 && display.value !== ""){
                value2 = display.value;
                mode.value = "🅿️   The result of " + value2 + "% of " + value1 + " is:";
                var result = (Number(value1) * Number(value2)) / 100;
                display.value = result;
                step++;
            }
            if(step === 1 && display.value !== ""){
                value1 = display.value;
                mode.value = "🅿️   Total entered: " + value1 + ". PUT %";
                display.value = "";
                step++;
            }
            if(step === 0){
                mode.value = "🅿️   PUT TOTAL";
                step++;
            }
        }
        if(modeOption===2){
            console.log("percentage step: " + step);
            if(step === 3){
                mode.value = "";
                modeOption = 0;
                value1, value2 = "";
                //step = 0;
                console.log("modeOption RESET: " + modeOption);
            }
            if(step === 2 && display.value !== ""){
                value2 = display.value;
                mode.value = "🅿️   The result of " + value2 + "% of " + value1 + " is:";
                var result = (Number(value1) * Number(value2)) / 100;
                display.value = result;
                step++;
            }
            if(step === 1 && display.value !== ""){
                value1 = display.value;
                mode.value = "🅿️   Total entered: " + value1 + ". PUT %";
                display.value = "";
                step++;
            }
            if(step === 0){
                mode.value = "🩺   PUT TOTAL";
                step++;
            }
        }
        if(modeOption===3){
            console.log("racing step: " + step);
            if(step === 3){
                mode.value = "";
                modeOption = 0;
                value1, value2 = "";
                //step = 0;
                console.log("modeOption RESET: " + modeOption);
            }
            if(step === 2 && display.value !== ""){
                value2 = display.value;
                mode.value = "🐴   The speed is (km/h): ";
                var result = (Number(value1) / Number(value2)) *3.6;
                display.value = Math.round(result);
                step++;
            }
            if(step === 1 && display.value !== ""){
                value1 = display.value;
                mode.value = "🐴   Dist. entered: " + value1 + " m. PUT SECONDS";
                display.value = "";
                step++;
            }
            if(step === 0){
                mode.value = "🐴   PUT DISTANCE (METERS)";
                step++;
            }
        }
    }
//---Mode functions---
function percentage(){
    step = 0;
    if(modeOption === 1){
        modeOption = 0;
        mode.value = "";
        //display.value = "";
    } 
    else{
        modeOption = 1;
        calculate();
    }
    console.log("modeOption " + modeOption + " (percentage)");
}
function veterinary(){
    step = 0;
    if(modeOption === 2){
        modeOption = 0;
        mode.value = "";
        //display.value = "";
    } 
    else{
        modeOption = 2;
        calculate();
    }
    console.log("modeOption " + modeOption + " (percentage)");
}
function racing(){
    step = 0;
    if(modeOption === 4){
        modeOption = 0;
        mode.value = "";
        //display.value = "";
    } 
    else{
        modeOption = 4;
        calculate();
    }
    console.log("modeOption " + modeOption + " (racing)");
}
