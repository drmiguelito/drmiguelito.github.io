//---Getting elements---
const mode = document.getElementById("mode");
const mode1 = document.getElementById("mode1");
const mode2 = document.getElementById("mode2");
const mode3 = document.getElementById("mode3");
const mode4 = document.getElementById("mode4");
const display = document.getElementById("display");

//---Event listeners---
document.addEventListener("click", clickPressed);
document.addEventListener("keydown", keyPressed);

//---Main functions---
var modeOption = 0;
var step = 0;
var value1, value2, value3 =  "";

//>>Mouse
function clickPressed(){
}
//>>Keyboard
function keyPressed(event){
    if(event.key === "Enter"){
        calculate();
    }
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
            brek;
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
            modePercentage();
            break;
        case "r":
            modeRacing();
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
    if(modeOption===0){
        mode.value = display.value + " =";
        display.value = eval(display.value);
    }
    //Percentage
    if(modeOption===1){
        modePercentage();
    }
    //Veterinary
    if(modeOption===2){
        modeVeterinaryDose();
    }
    //Racing
    if(modeOption===4){
        modeRacing();
    }
}
//---Mode functions---
//--Percentage
function modePercentage(){
    console.log("percentage step: " + step);
    //Paso 3: clear values
    if(step === 3){
        mode.value = "";
        modeOption = 0;
        value1, value2 = "";
        console.log("modeOption CLEAR: " + modeOption);
    }
    //Step 2: formula
    if(step === 2){
        if(display.value !== ""){
            value2 = display.value;
            mode.value = "p(%) The " + value2 + "% of " + value1 + " is:";
            let result = (Number(value1) * Number(value2)) / 100;
            display.value = result;
            step++;
            console.log("percentage step--> " + step);
        }
    }
    //Step 1: second value
    if(step === 1){
        if(display.value !== ""){
            value1 = display.value;
            mode.value = "🅿️ Total entered: " + value1 + ". PUT %";
            display.value = "";
            step++;
            console.log("percentage step--> " + step);
        }
    }
    //Step 0: first value
    if(step === 0){
        mode.value = "🅿️ PUT TOTAL";
        step++;
        console.log("percentage step--> " + step);
    }
}
//--Racing (km/h)
function modeRacing(){
    //Step 3: clear
    console.log("racing step: " + step);
    if(step === 3){
        mode.value = "";
        modeOption = 0;
        value1, value2 = "";
        console.log("modeORacingOption RESET: " + modeOption);
    }
    //Step 2: formula
    if(display.value !== ""){
        if(step === 2){
            value2 = display.value;
            mode.value = "🏇The speed over " + value1 + "m in " + value2 + "s is (km/h): ";
            var result = (Number(value1) / Number(value2)) *3.6;
            display.value = Math.round(result);
            step++;
        }
    }
    //Step 1: second value (seconds)
    if(display.value !== ""){
        if(step === 1){
            value1 = display.value;
            mode.value = "🏇 Distance: " + value1 + " m. Put SECONDS";
            display.value = ""; 
            step++;
        }
    }
    //Step 0: first value (meters)
    if(step === 0){
        mode.value = "🏇(KM/H using meters and seconds)";
        setTimeout(()=>{
            mode.value = "🏇 Put DISTANCE (meters)";
        }, 2000);       
        step++;
    }
}
//--Veterinary (fluid therapy)
function modeVeterinaryDose(){
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


//--Select mode
function selectMode(modeID){
    step = 0;
    //--Mode percentage
    if(modeID === "mode1"){
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
    //--Mode horse racing km/h
    if(modeID === "mode4"){
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
}
