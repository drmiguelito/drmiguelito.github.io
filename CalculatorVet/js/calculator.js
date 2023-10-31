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
var unit = "";

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
        if(display.value !== ""){
            display.value = eval(display.value);
        }
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
    //Unit conversor
    if(display.value !== ""){
        value1 = display.value;
        console.log(modeID);
        switch(modeID){
            case "modeConversor":
                mode.value = "Convert units: choose initial unit";
                break;
            case "convGs":
                convGs();
                break;
            case "convKg":
                convKg();
                break;
            case "convOz":
                convOz();
                break;
            case "convLb":
                convLb();
                break;
            case "convSt":
                convSt();
                break;
        } 
    }else{
        mode.value = "Enter a number and choose unit";
    }
    //Other calculations
    //Square root:
    if(modeID ==="squareRoot"){
        value1 = display.value;
        result = Math.sqrt(Number(value1));
        mode.value = "√" + value1 + " =";
        display.value = result.toFixed(2);
        value1 = 0; //clear
    }
    //Squared:
    if(modeID ==="squared"){
        value1 = display.value;
        result = Number(value1)*Number(value1);
        mode.value = value1 + "^2 =";
        display.value = result.toFixed(2);
        value1 = 0; //clear
    }
    if(modeID ==="ln"){
        value1 = display.value;
        result = Math.log(Number(value1));
        mode.value = "ln(" + value1 + ") =";
        display.value = result.toFixed(2);
        value1 = 0; //clear
    }
    if(modeID ==="circ"){
        if(display.value !== ""){
            value1 = display.value;
            result = Math.PI * Number(value1) * Number(value1);
            mode.value = "The cimcurference (r = " + value1 + ") is:";
            display.value = result.toFixed(2);
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
//---Conversion functions----
//-->Grams
function convGs(){
    if(unit !==""){
        switch(unit){
            case "kg": //1
                result = Number(value1) * 1000;
                mode.value = value1 + " kg to g:"
                display.value = result;
                unit = "";
                break;
            case "lb": //2: 1 pound equals 453.6 grams
                result = Number(value1) * 453.592;
                mode.value = value1 + " lb to g:"
                display.value = result;
                unit = "";
                break;
            case "st": //3: 1 stone equals 6,350.29 grams
                result = Number(value1) * 6350.29;
                mode.value = value1 + " st to g:"
                display.value = result;
                unit = "";
                break;
            case "oz": //4: 1 ounce equals to 28.35 grams
                result = Number(value1) * 28.35;
                mode.value = value1 + " oz to g:"
                display.value = result;
                unit = "";
                break;
            default:
                console.log("Unit type not found");
                break;
        }
    } else {
        unit = "g";
        mode.value = value1 + " gs" + ". Choose unit destination";
    }
}
//-->Kilograms
function convKg(){
    if(unit !==""){
        switch(unit){
            case "g": //1
                result = Number(value1) / 1000;
                mode.value = value1 + "g to kg:"
                display.value = result;
                unit = "";
                break;
            case "lb": //2: 1 pound is 0.4536 kg
                result = Number(value1) * 0.4536;
                mode.value = value1 + "lb to kg:"
                display.value = result.toFixed(4);
                unit = "";
                break;
            case "st": //3: 1 stone is 0.1574 kg
                result = Number(value1) / 0.1574;
                mode.value = value1 + "st to kg:"
                display.value = result.toFixed(4);
                unit = "";
                break;
            case "oz": //4: 1 ounce is 0.02834 kg
                result = Number(value1) * 0.02834;
                mode.value = value1 + " oz to kg:"
                display.value = result;
                unit = "";
                break;
            default:
                console.log("Unit type not found");
                break;
        }
    } else {
        unit = "kg";
        mode.value = value1 + " kg" + ". Choose unit destination";
    }
}
//-->Pounds
function convLb(){ //<-- Pounds
    if(unit !==""){
        switch(unit){
            case "g": //1: 1 gram is 0.002204 lbs
                result = (Number(value1) / 1000) * 2.204;
                mode.value = value1 + " g to lb:"
                display.value = result.toFixed(6);
                unit = "";
                break;
            case "kg": //2: 1 kg is 2.204 lbs
                result = Number(value1) * 2.204;
                mode.value = value1 + " kg to lb:"
                display.value = result.toFixed(2);
                unit = "";
                break;
            case "st": //3: 1 st is 14 lbs
                result = Number(value1) * 14;
                mode.value = value1 + " st to lb:"
                display.value = result.toFixed(2);
                unit = "";
                break;
            case "oz": //4: 1 oz is 0.0625 lbs
                result = Number(value1) * 0.0625;
                mode.value = value1 + " oz to lb:"
                display.value = result.toFixed(2);
                unit = "";
                break;
            default:
                console.log("Unit type not found");
                break;
            }
        } else {
            unit = "lb";
            mode.value = value1 + " lbs" + ". Choose unit destination";
        }
}
//-->Ounces
function convOz(){
    if(unit !==""){
        switch(unit){
            case "g": //1: 1 gram is 0.03527 ounces
                result = Number(value1) * 0.0353;
                mode.value = value1 + " g to oz:"
                display.value = result.toFixed(6);
                unit = "";
                break;
            case "kg": //2: 1 kg is 35.27 ounces
                result = Number(value1) * 35.274;
                mode.value = value1 + " kg to oz:"
                display.value = result.toFixed(2);
                unit = "";
                break;
            case "lb": //3: 1 pound is 16 ounces
                result = Number(value1) * 16;
                mode.value = value1 + " lb to oz:"
                display.value = result.toFixed(2);
                unit = "";
                break;
            case "st": //4: 1 stone is 224 ounces
                result = Number(value1) * 224;
                mode.value = value1 + " st to oz:"
                display.value = result.toFixed(2);
                unit = "";
                break;
            default:
                console.log("Unit type not found");
                break;
        }
    } else {
        unit = "oz";
        step = 1;
        mode.value = value1 + " oz" + ". Choose unit destination";
    }
}
//-->Stone
function convSt(){ //<--Stones
    if(unit !==""){
        switch(unit){
            case "g": //1: 1 gram is 0.000157 stones
                result = (Number(value1) / 1000) * 0.1575;
                mode.value = value1 + " g to st:"
                display.value = result.toFixed(6);
                unit = "";
                break;
            case "kg": //2: 1 kg is 0.1575
                result = Number(value1) * 0.1575;
                mode.value = value1 + " kg to st:"
                display.value = result.toFixed(4);
                unit = "";
                break;
            case "lb": //3: 1 lb is 0.0714 stones
                result = Number(value1) * 0.0714;
                mode.value = value1 + " lb to st:"
                display.value = result.toFixed(6);
                unit = "";
                break;
            case "oz": //4: 1 ounce is 0.00446 stones
                result = Number(value1) * 0.00446;
                mode.value = value1 + " oz to st:"
                display.value = result.toFixed(6);
                unit = "";
                break;
            default:
                console.log("Unit type not found");
                break;
            }
        } else {
            unit = "st";
            mode.value = value1 + " st" + ". Choose unit destination";
        } 
} 
