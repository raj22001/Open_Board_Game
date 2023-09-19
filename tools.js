let optionsCont = document.querySelector(".options-cont");
let toolsCont = document.querySelector(".tools-cont");
let pencilToolCont= document.querySelector(".pencil-tool-cont");
let eraseToolCont= document.querySelector(".eraser-tool-cont");
let pencil = document.querySelector(".pencil")
let eraser = document.querySelector(".eraser")
let sticky = document.querySelector(".stickynote")
let upload = document.querySelector(".upload");
let optionsFlag = true;
let pencilFlag = false;
let eraseFlag = false;

optionsCont.addEventListener("click" , (e) =>{
    optionsFlag =  !optionsFlag;

    if(optionsFlag) openTools();
    else closeTools();
})


let iconElem = optionsCont.children[0];
function openTools(){
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = "flex"
}

function closeTools() {
    //let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times")
    toolsCont.style.display = "none"

    pencilToolCont.style.display="none"
    eraseToolCont.style.display="none"
}

pencil.addEventListener("click" , (e) =>{
    pencilFlag = !pencilFlag;

    if(pencilFlag){
        pencilToolCont.style.display = "block"
    }else{
        pencilToolCont.style.display = "none"
    }
})

eraser.addEventListener("click" , (e) =>{
    eraseFlag = !eraseFlag;

    if(eraseFlag){
        eraseToolCont.style.display = "flex"
    }else{
        eraseToolCont.style.display = "none"
    }
})

upload.addEventListener("click" , (e) =>{
    let input = document.createElement('input');
    input.setAttribute("type" , "file");
    input.click();

    input.addEventListener("change" , (e) =>{
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplateHTML = `
        div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
        <img src="${url}"/>
    </div>
        `;
        createStricky(stickyTemplateHTML);
    })
})

sticky.addEventListener("click" , (e) =>{
    let stickyTemplateHTML = `
        <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
            <textarea></textarea>
        </div>
    `;

    createStricky(stickyTemplateHTML);
})

function createStricky(stickyTemplateHTML){
    let stickyCount = document.createElement("div");
    stickyCount.setAttribute("class","sticky-cont");
    stickyCount.innerHTML = stickyTemplateHTML;
    document.body.appendChild(stickyCount)

    let minimize = stickyCount.querySelector(".minimize");
    let remove = stickyCount.querySelector(".remove");

    noteActions(minimize , remove , stickyCount);

    stickyCount.onmousedown =function(event){
        dragAndDrop(stickyCount , event);
    };

    stickyCount.ondragstart = function(){
        return false;
    }
}

function noteActions(minimize , remove , stickyCount){
    remove.addEventListener("click" , (e) =>{
        stickyCount.remove();
    })
    minimize.addEventListener("click" , (e) =>{
        let noteCont = stickyCount.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display")
        if(display === "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    })
}

function dragAndDrop(element , event){
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX , event.pageY);

    function moveAt(pageX , pageY){
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY-shiftY + 'px';
    }

    function onMouseMove(event){
        moveAt(event.pageX , event.pageY);
    }
    document.addEventListener('mousemove' , onMouseMove);

    element.onmouseup = function(){
        document.removeEventListener('mousemove' , onMouseMove)
        event.onmouseup = null;
    }
}