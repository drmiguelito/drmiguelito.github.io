//---Get elements---
const textResult = document.getElementById("texto");

//---Variables---
var random, random1, random2 = 1;

//---Functions---
function rollDice(){
    var rollDice1 = Math.floor(Math.random()*6 + 1);
    var rollDice2 = Math.floor(Math.random()*6 + 1);
    console.log("Dice 1: " + rollDice1 + ". Dice 2: " + rollDice2);
    textResult.innerHTML = "El valor es: ... ";
    dice = document.getElementById("dice1");
    random = rollDice1;
    random1 = random;
    console.log(random);
    showResult();
    setTimeout(()=>{
        dice = document.getElementById("dice2");
        random = rollDice2;
        random2 = random;
        console.log(random);
        showResult();
        rollDice1 = 0;
        rollDice2 = 0;
        setTimeout(()=>{
            textResult.innerHTML = "El valor es: " + (random1 + random2);
        }, 1900) 
    }, 2000);
}
function showResult(){
    dice.style.animation = "rolling 1s";
    setTimeout(()=>{
        switch(random){
            case 1:
                dice.style.transform = "rotateX(0deg) rotateY(0deg)";
                break;
            case 2:
                dice.style.transform = "rotateX(-90deg) rotateY(0deg)";
                break;
            case 3:
                 dice.style.transform = "rotateX(0deg) rotateY(90deg)";
                break;
            case 4:
                dice.style.transform = "rotateX(0deg) rotateY(-90deg)";
                break;
            case 5:
                dice.style.transform = "rotateX(90deg) rotateY(0deg)";
                break;
            case 6:
                dice.style.transform = "rotateX(180deg) rotateY(0deg)";
                break;
            default:
                break;
        }
        dice.style.animation = "none";
    }, 1000);
}
