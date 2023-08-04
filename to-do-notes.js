//Capturamos los elementos html para manipularlos con JS
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

//Que un enter ponga el foco en el inputBox
document.addEventListener("keypress", function(evento){
    if(evento.key==="Enter"){
        inputBox.focus();
    }
});
//Que un enter directamente agregue el ítem
inputBox.addEventListener("keypress", function(evento){
    if(evento.key==="Enter"){
        agregarItem();
    }
});
//Función para agregar ítems
function agregarItem(){
    const fecha = new Date();
    if (inputBox.value===''){
        alert("Por favor, escriba un ítem");
        } 
    else {
        let li = document.createElement("li");
        li.innerHTML = fecha.toLocaleDateString() + " - " + inputBox.value; 
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value="";
    Guardar();
}  
//Función anónima para tachar ítem y para eliminarlo
listContainer.addEventListener("click", function(e){
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
        Guardar();
    }
    else if(e.target.tagName ==="SPAN"){
        let limpiar = confirm("¿Seguro de eliminar este elemento?");
        if (limpiar == true){
            e.target.parentElement.remove();
            Guardar();
        }
    }
}, false);
//Función para guardar en local storage
function Guardar(){
    localStorage.setItem("data", listContainer.innerHTML);
}
//Función para mostrar la lista guardada en local storage
function mostrarLista(){
    listContainer.innerHTML = localStorage.getItem("data");
}
mostrarLista();
