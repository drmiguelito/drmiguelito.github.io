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
        case "P":
            modeAddPercentage();
            break;
        case "r":
            modeRacing();
            break;
    }
}
//-->DE button
function backspace(){ 
    display.value = display.value.toString().slice(0,-1)
}
//-->AC button
function restart(){
    modeOption = 0;
    mode.value = "";
    display.value = "";
}
//-->Enter button
function calculate(){
    //Regular calculations (+, -, /, *)
    if(modeOption===0){
        mode.value = display.value + " =";
        display.value = eval(display.value);
    }
    //Mode percentage (mode1)
    if(modeOption===1){
        modePercentage();
    }
    //Mode add percentage (mode2)
    if(modeOption===2){
        modeAddPercentage();
    }
    //Racing
    if(modeOption===4){
        modeRacing();
    }
}
//>>Mouse
function selectMode(modeID){
    step = 0;
    //Percentage mode
    if(modeID === "mode1"){
        if(modeOption === 1){ //If already is selected...
            modeOption = 0;
            mode.value = "";
        } else { //If not...
            modeOption = 1;
            calculate();
        }
        console.log("modeOption " + modeOption + " (percentage)");
    }
    //Add percentage mode 
    if(modeID === "mode2"){
        if(modeOption === 2){
            modeOption = 0;
            mode.value = "";
        } else {
            modeOption = 2;
            calculate();
        }
        console.log("modeOption " + modeOption + " (add percentage)");
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
    //Other calculations
    //Square root:
    if(modeID ==="squareRoot"){
        value1 = display.value;
        result = Math.sqrt(Number(value1));
        mode.value = "√" + value1 + " =";
        display.value = result;
        value1 = 0; //clear
    }
    //Squared:
    if(modeID ==="squared"){
        value1 = display.value;
        result = Number(value1)*Number(value1);
        mode.value = value1 + "^2 =";
        display.value = result;
        value1 = 0; //clear
    }
    if(modeID ==="ln"){
        value1 = display.value;
        result = Math.log(Number(value1));
        mode.value = "ln(" + value1 + ") =";
        display.value = result;
        value1 = 0; //clear
    }
    if(modeID ==="circ"){
        if(display.value !== ""){
            value1 = display.value;
            result = Math.PI * Number(value1) * Number(value1);
            mode.value = "The cimcurference (r = " + value1 + ") is:";
            display.value = result;
            value1 = 0; //clear
        } else {
            mode.value = "Enter radius and press 'circ' button"
        }
    }
}
//--Mode functions
//Mode1: Percentage (p% button)
function modePercentage(){
    console.log("percentage step: " + step);
    //Step 2: clear values
    if(step === 2){
        mode.value = "";
        modeOption = 0;
        value1, value2 = "";
        console.log("modeOption CLEAR: " + modeOption);
    }
    //Step 1: second value & formula
    if(step === 1){
        if(display.value !== ""){
            value2 = display.value;
            display.value = "";
            result = (Number(value1) * Number(value2)) / 100; 
            mode.value = "🅿️ The " + value2 + "% of " + value1 + " is:";
            display.value = result;
            step++;
            console.log("percentage step--> " + step);
        }
    }
    //Step 0: first value
    if(step === 0){
        if(modeOption === 1){
            if(display.value !== ""){ //If there's a value already...
                value1 = display.value;
                mode.value = "🅿️ You entered: " + value1 + ". Put %";
                display.value = "";
                step++;
            } else { //If there's no value...
                mode.value = "🅿️ Put a number to calculate %";
            }
        } 
        console.log("percentage step--> " + step);
    }
}
//Mode2: Add percentage (+p% button)
function modeAddPercentage(){
    console.log("add percentage step: " + step);
    //Paso 2: clear values
    if(step === 3){
        mode.value = "";
        modeOption = 0;
        value1, value2 = "";
        console.log("modeOption CLEAR: " + modeOption);
    }
    //Step 1: second value & formula
    if(step === 1){
        if(display.value !== ""){
            value2 = display.value;
            mode.value = "🅿️ " + value1 + " + their " + value2 + "% is:";
            result = Number(value1) + ((Number(value1) * Number(value2)) / 100);
            display.value = result;
            step++;
            console.log("add percentage step--> " + step);
        }
    }
    //Step 0: first value
    if(step === 0){
        if(display.value !== ""){
            value1 = display.value;
            display.value ="";
            mode.value = "🅿️ You entered: " + value1 + ". Put %";
            step++;
        } else {
            mode.value = "🅿️ Put a number and after press enter";
        }
        console.log("add percentage step--> " + step);
    }
}




function clickPressed(){

}
//--Mode functions--

//-->Add percentage (+p% button)








    

//---Mode functions---



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
            if(modeOption === 4) mode.value = "🏇 Put DISTANCE (meters)";
        }, 2000);       
        step++;
    }
}
//--Veterinary (fluid therapy)
function modeVeterinaryDose(){
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
    //Step 1: second value (dose in mg)
    if(display.value !== ""){
        if(step === 1){
            value1 = display.value;
            mode.value = "💉 Weight: " + value1 + " kg. Put DOSE (mg)";
            display.value = ""; 
            step++;
        }
    }
    //Step 0: first value (weight in kg)
    if(step === 0){
        mode.value = "💉(Dose per day)";
        setTimeout(()=>{
            if(modeOption === 4) mode.value = "💉 Put WEIGHT (kg)";
        }, 2000);       
        step++;
    }
    console.log("modeOption " + modeOption + " (percentage)");
}
