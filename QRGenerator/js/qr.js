// ---Get elements---
let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");

//---Event listeners---
//>>Enter
document.addEventListener("keydown", (event)=>{
    if(event.key === "Enter"){
        qrTextFocus();
        generateQR();
    }
});
//>>Click
qrImage.addEventListener("click", ()=>{
    if(!document.getElementById("btSave")){
        var buttonSave = document.createElement('button');
        buttonSave.type = 'button';
        buttonSave.innerHTML = 'Save QR';
        buttonSave.id = 'btSave';
        imgBox.appendChild(buttonSave);
    }
    else{
        var btSave = document.getElementById("btSave");
        btSave.addEventListener("click", openSaveAsDialog);
        btSave.addEventListener("mouseout", ()=>{
            btSave.parentNode.removeChild(btSave);
        });
    }
});
document.addEventListener("touchmove", ()=>{
    if(document.getElementById("btSave")){
        btSave.parentNode.removeChild(btSave);
    }
});
/*document.addEventListener("touchend", ()=>{
    if(document.getElementById("btSave")){
        btSave.parentNode.removeChild(btSave);
    }
});*/
//---QR generator
function generateQR(){
    if(qrText.value.length > 0){ //evita que se ejecute si el textbox está vacío
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrText.value;
        imgBox.classList.add("show-img");
    }else{
        qrText.classList.add('error');
        setTimeout(()=>{
            qrText.classList.remove('error');
        }, 500)
    }
    if(!document.getElementById("btSave")){
        btSave.parentNode.removeChild(btSave)
    }
}
//---Save As QR image
function openSaveAsDialog(){
    let imgSrc = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrText.value;
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = ()=>{
        let blob = xhr.response;
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'qr-image.png';
        link.click();
    };
    xhr.open('GET', imgSrc);
    xhr.send();
}
//---Focus
function qrTextFocus(){
    qrText.focus();
}
setTimeout(qrTextFocus, 2500);   
