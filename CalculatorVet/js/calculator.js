//---Getting elements---
const mode = document.getElementById("mode");
const mode1 = document.getElementById("modePerc");
const mode2 = document.getElementById("modeAddPerc");
const mode3 = document.getElementById("modeRacing");
const mode4 = document.getElementById("modeVet");
const display = document.getElementById("display");

//---Event listeners---
document.addEventListener("click", clickPressed);
document.addEventListener("keydown", keyPressed);

//---Main variables---
var modeOption = 0;
var step = 0;
var value1, value2, value3 =  "";
var unit = "";

//---------------------------------------------------//
//--Buttons--
//>>Keyboard
function keyPressed(event){
    if(event.key === "Enter") calculate();
    if(event.key === "0") display.value += "0";
    if(event.key === "1") display.value += "1";
    if(event.key === "2") display.value += "2";
    if(event.key === "3") display.value += "3";
    if(event.key === "4") display.value += "4";
    if(event.key === "5") display.value += "5";
    if(event.key === "6") display.value += "6";
    if(event.key === "7") display.value += "7";
    if(event.key === "8") display.value += "8";
    if(event.key === "9") display.value += "9";
    if(event.key === ".") display.value += ".";
    if(event.key === "+") display.value += "+";
    if(event.key === "-") display.value += "-";
    if(event.key === "*") display.value += "*";
    if(event.key === "/") display.value += "/";
    if(event.key === "Backspace") backspace();
    if(event.key === "Delete") restart();
    if(event.key === "p") modePercentage();
    if(event.key === "P") modeAddPercentage();
    if(event.key === "r") modeRacing();
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
//>>Mouse - touch
//-->By id
function selectMode(modeID){
    if(modeID === "enter") calculate();
    if(modeID === "modePerc") modePercentage(); // Percentage (%p)
    if(modeID === "modeAddPerc") modeAddPercentage(); // Add percentage (+p%)
    if(modeID === "modeRacing") modeRacing();
    if(modeID ==="squareRoot") calc_squareRoot(); //Square root (√)
    if(modeID ==="squared") calc_squared(); //Squared (X^2)
    if(modeID ==="ln") calc_ln(); // Natural logarithm (ln)
    if(modeID ==="circ") calc_circ(); // Circule (CIRC)
    if(modeID === "modeConversor") mode.value = "Unidades: Elija unidad de origen";
    if(modeID === "convGs") convGs(); //Mass: grams
    if(modeID === "convMg") convMg(); //Mass: miligrams
    if(modeID === "convMcg") convMcg(); //Mass: micrograms
    if(modeID === "convUI") convUI(); //Mass: International Units
    if(modeID === "convPPM") convPPM(); //Mass: Parts Per Mille
    if(modeID === "convM") convM(); //Distance: meters
    if(modeID === "convKm") convKm(); //Distance: kilometers
    if(modeID === "convMi") convMi(); //Distance: miles
    if(modeID === "convFt") convFt(); //Distance: feets
    if(modeID === "convYd") convYd(); //Distance: yars
    if(modeID === "convC") convC(); //Temperature: celsius
    if(modeID === "convF") convF(); //Temperature: farenheit
    if(modeID === "convK") convK();//Temperature: kelvin
    console.log(modeID);
}
//-->Enter button
function calculate(){ 
    if(modeOption===0) calc_general(); //mode 0
    if(modeOption===1) calc_percentage(); //mode 1
    if(modeOption===2) calc_addPercentage(); //mode 2
    if(modeOption===4) modeRacing(); //mode 4
}
//-->Percentage mode button (%p)
function modePercentage(){
    step = 0;
    if(modeOption === 1){ //If already is selected...
        modeOption = 0;
        mode.value = "";
    } else { //If not...
        modeOption = 1;
        calculate();
    }
    console.log("modeOption " + modeOption + " (percentage)");
}
//-->Add percentage button (+%p)
function modeAddPercentage(){
    step = 0;
    if(modeOption === 2){
        modeOption = 0;
        mode.value = "";
    } else {
        modeOption = 2;
        calculate();
    }
    console.log("modeOption " + modeOption + " (add percentage)");
}
//-->Racing button
function modeRacing(){
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
//---------------------------------------------------//
//--General calculations-- 
function calc_general(){
    mode.value = display.value + " =";
    if(display.value !== ""){
        display.value = eval(display.value);
    }
}
function calc_squareRoot(){
    value1 = display.value;
    result = Math.sqrt(Number(value1));
    mode.value = "√" + value1 + " =";
    display.value = result.toFixed(2);
    value1 = 0; 
}
function calc_squared(){
    value1 = display.value;
    result = Number(value1)*Number(value1);
    mode.value = value1 + "^2 =";
    display.value = result.toFixed(2);
    value1 = 0;
}
function calc_ln(){
    value1 = display.value;
    result = Math.log(Number(value1));
    mode.value = "ln(" + value1 + ") =";
    display.value = result.toFixed(2);
    value1 = 0;
}
function calc_circ(){
    if(display.value !== ""){
        value1 = display.value;
        result = Math.PI * Number(value1) * Number(value1);
        mode.value = "La circunferencia (r = " + value1 + ") es:";
        display.value = result.toFixed(2);
        value1 = 0;
    } else {
        mode.value = "Ingrese radio y presione CIRC"
    }
}
//---------------------------------------------------//
//--Mode calculations--
function calc_percentage(){
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
            mode.value = "🅿️ El " + value2 + "% de " + value1 + " es:";
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
                mode.value = "🅿️ Ingresó: " + value1 + ". Escriba %";
                display.value = "";
                step++;
            } else { //If there's no value...
                mode.value = "🅿️ Ingrese número...";
            }
        } 
        console.log("percentage step--> " + step);
    }
}
function calc_addPercentage(){
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
            mode.value = "🅿️ " + value1 + " + su " + value2 + "% es:";
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
            mode.value = "🅿️ Valor: " + value1 + ". Ingrese %";
            step++;
        } else {
            mode.value = "🅿️ Ingrese número y luego presione enter";
        }
        console.log("add percentage step--> " + step);
    }
}
function calc_racingKMH(){
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
            mode.value = "🏇Velocidad en " + value1 + "m in " + value2 + "s es (km/h): ";
            var result = (Number(value1) / Number(value2)) *3.6;
            display.value = Math.round(result);
            step++;
        }
    }
    //Step 1: second value (seconds)
    if(display.value !== ""){
        if(step === 1){
            value1 = display.value;
            mode.value = "🏇 Distancia: " + value1 + " m. Ingrese SECONDS";
            display.value = ""; 
            step++;
        }
    }
    //Step 0: first value (meters)
    if(step === 0){
        mode.value = "🏇(KM/H usando mts y segundos)";
        setTimeout(()=>{
            if(modeOption === 4) mode.value = "🏇 Ingrese DISTANCE (meters)";
        }, 2000);       
        step++;
    }
}
//---------------------------------------------------//
//---Units calculations----
function calc_convertion(){
    if(display.value !== ""){
        value1 = display.value;    
    } else mode.value = "Ingrese valor";
}
//--Mass--
function convGs(){ //Grams
    if(display.value !== ""){
        value1 = display.value;
        if(unit ===""){
            unit = "g";
            mode.value = value1 + " gs" + ". Elija unidad destino";
        } else {
            switch(unit){
                case "mg": //1
                    result = Number(value1) / 1000;
                    mode.value = value1 + " mg a g:"
                    display.value = result;
                    unit = "";
                    break;
                case "mcg": //2
                    result = Number(value1) / 1000000;
                    mode.value = value1 + " mcg a g:"
                    display.value = result;
                    unit = "";
                    break;
                case "UI": //3
                    result = Number(value1) / 1000000 / 0.03;
                    mode.value = value1 + " UI (insulina porcina) to g:"
                    display.value = result;
                    unit = "";
                    break;
                case "ppm": //4
                    result = Number(value1) / 1000;
                    mode.value = value1 + " ppm a g/L:"
                    display.value = result;
                    unit = "";
                    break;
                default:
                    console.log("Unit type not found");
                    break;
            }
        }
    } else mode.value = "Ingrese valor";   
}
function convMg(){ //Miligrams
    if(display.value !== ""){
        value1 = display.value;
        if(unit ===""){
            unit = "mg";
            mode.value = value1 + " mg" + ". Elija unidad destino";
        } else {
            switch(unit){
                case "g": //1
                    result = Number(value1) * 1000;
                    mode.value = value1 + "g a mg:"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                    case "mcg": //2
                    result = Number(value1) / 1000;
                    mode.value = value1 + "mcg a mg:"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                case "UI": //3
                    result = Number(value1) / 0.03;
                    mode.value = value1 + "UI to mg:"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                case "ppm": //4
                    result = Number(value1);
                    mode.value = value1 + " ppm to mg/L (1 ppm = 1mg/L):"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                default:
                    console.log("Unit type not found");
                    break;
            }
        }
    } else mode.value = "Ingrese valor";
}
function convMcg(){ //Micrograms
    if(display.value !== ""){
        value1 = display.value;
        if(unit ===""){
            unit = "mcg";
            mode.value = value1 + " mcg" + ". Elija unidad destino";
        } else {
            switch(unit){
                case "g": //1
                    result = Number(value1) * 1000000;
                    mode.value = value1 + " g a mcg:"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                case "mg": //2
                    result = Number(value1) * 1000;
                    mode.value = value1 + " mg a mcg:"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                case "UI": //3
                    result = Number(value1) * 0.03;
                    mode.value = value1 + " UI (insulina porcina) a mcg:"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                case "ppm": //4
                    result = Number(value1);
                    mode.value = value1 + " ppm to mcg/L:"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                default:
                    console.log("Unit type not found");
                    break;
            }
        }    
    } else mode.value = "Ingrese valor";
}
function convPPM(){ //Parts Per Mille
    if(display.value !== ""){
        value1 = display.value;
        if(unit ===""){
            unit = "ppm";
            mode.value = value1 + " ppm" + ". Elija unidad/L destino";
        } else {
            switch(unit){
                case "g": //1
                    result = Number(value1) / 1000000
                    mode.value = value1 + " g/L a ppm:"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                case "mg": //2
                    result = Number(value1) / 1000;
                    mode.value = value1 + " mg/L a ppm:"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                case "mcg": //3
                    result = Number(value1) * 0.9988;
                    mode.value = value1 + " mcg/L a ppm:"
                    display.value = result.toFixed(4);
                    unit = "";
                    break;
                case "UI": //4: 1 stone is 224 ounces
                    result = (Number(value1) / 0.03) * 1000;
                    mode.value = value1 + " UI/L a ppm:"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                default:
                    console.log("Unit type not found");
                    break;
            }
        }
    } else mode.value = "Ingrese valor";
}
function convUI(){ //International Units
    if(display.value !== ""){
        value1 = display.value; 
        if(unit ===""){
            unit = "UI";
            mode.value = value1 + " " + unit + ". Elija unidad destino";
        } else {
            switch(unit){
                case "g": //1
                    result = (Number(value1) * 1000000) / 0.03;
                    mode.value = value1 + " g a UI (insul. porcina):"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                case "mg": //2
                    result = (Number(value1) * 1000) / 0.03;
                    mode.value = value1 + " mg a UI (insul. porcina):"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                case "mcg": //3
                    result = Number(value1) * 0.03;
                    mode.value = value1 + " mcg a UI (insul. porcina):"
                    display.value = result.toFixed(4);
                    unit = "";
                    break;
                case "ppm": //4
                    result = Number(value1) * 0.03;
                    mode.value = value1 + " ppm to UI/L:"
                    display.value = result.toFixed(4);
                    unit = "";
                    break;
                default:
                    console.log("Unit type not found");
                    break;
                }
        }
    } else mode.value = "Ingrese valor"; 
}   
//--Temperature--
function convC(){ //Celsius
    if(display.value !== ""){
        value1 = display.value;  
        if(unit ===""){
            unit = "C";
            mode.value = value1 + " " + unit + ". Elija unidad destino";
        } else {
            switch(unit){
                case "F": //1
                    result = (parseFloat(value1) - 32) / 1.8;
                    mode.value = value1 + " F a Celsius:"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                case "K": //2
                    result = (parseFloat(value1) - 273.15);
                    mode.value = value1 + " K a Celsius:"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                default:
                    console.log("Unit type not found");
                    break;
            }
        }
    } else mode.value = "Ingrese valor";
}
function convF(){ //Fahrenheit
    if(display.value !== ""){
        value1 = display.value;
        if(unit ===""){
            unit = "F";
            mode.value = value1 + " " + unit + ". Elija unidad destino";
        } else {
            switch(unit){
                case "C": //1
                    result = (parseFloat(value1) * 1.8) + 32;
                    mode.value = value1 + " °C a Fahrenheit:"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                case "K": //2
                    result = (parseFloat(value1) + 32) / 1.8;
                    mode.value = value1 + " Kelvin a Fahrenheit:"
                    display.value = result.toFixed(2);
                    unit = "";
                    break;
                default:
                    console.log("Unit type not found");
                    break;
            }
        }
    } else mode.value = "Ingrese valor"; 
}
function convK(){ //Kelvin
    if(display.value !== ""){
        value1 = display.value;
        if(unit ===""){
            unit = "K";
            mode.value = value1 + " " + unit + ". Elija unidad destino";
        } else {
            switch(unit){
                case "C": //1
                        result = parseFloat(value1) + 273.15;
                        mode.value = value1 + " °C a Kelvin:"
                        display.value = result.toFixed(2);
                        unit = "";
                        break;
                    case "F": //2
                        result = (parseFloat(value1) + 459.67) * (5/9);
                        mode.value = value1 + " F° a Kelvin:"
                        display.value = result.toFixed(2);
                        unit = "";
                        break;
                    default:
                        console.log("Unit type not found");
                        break;
            }    
        } 
    } else mode.value = "Ingrese valor";
}

function clickPressed(){

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
            mode.value = "🏇LA velocidad de " + value1 + "m en " + value2 + "s es (km/h): ";
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
        mode.value = "💉(Dosis/día)";
        setTimeout(()=>{
            if(modeOption === 4) mode.value = "💉 Ingrese peso (kg)";
        }, 2000);       
        step++;
    }
    console.log("modeOption " + modeOption + " (percentage)");
}
