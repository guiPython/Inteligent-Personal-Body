import { ipcRenderer , remote } from "electron"

let win = remote.getCurrentWindow()

function minimizeWindow( browserWindow : Electron.BrowserWindow ):void{
    if ( browserWindow.minimizable ){
        browserWindow.minimize()
    }
}

function maximizeWindow( browserWindow : Electron.BrowserWindow ):void{
    if ( browserWindow.maximizable ){
        //browserWindow.maximize()
    }
}


function closeWindow( browserWindow : Electron.BrowserWindow ):void{
    browserWindow.close()
}

function isWindowMaximized( browserWindow : Electron.BrowserWindow ):boolean{
    return browserWindow.isMaximized()
}

function rotateModel(){
    let hiddenModel = document.getElementsByClassName("hidden")
    if ( hiddenModel[0].id == "frt_1" ){
        for ( let element of document.getElementsByClassName("back")){ element.classList.add("hidden")}
    }
    else{
        for ( let element of document.getElementsByClassName("frontal")){ element.classList.add("hidden")}
    }
    for ( let element of hiddenModel ){ element.classList.remove("hidden") }
}

document.addEventListener("DOMContentLoaded",()=>{

    const minimizeButton = document.getElementById("minimize") as HTMLElement;
    const maxUnmaxButton = document.getElementById("maximize") as HTMLElement;
    const closeButton = document.getElementById("close") as HTMLElement;
    const bvn = document.querySelector("#hello") as HTMLElement
    const cliente = JSON.parse(sessionStorage.getItem("cliente") as string) as any
    const btnRotate = document.getElementById("rotate") as HTMLButtonElement
    bvn.innerHTML = `Olá ${cliente.nome}`


    btnRotate.addEventListener("click" , () => {
        rotateModel()
    })

    minimizeButton.addEventListener("click", e => {
        minimizeWindow(win);
    });

    maxUnmaxButton.addEventListener("click", e => {
        const icon = maxUnmaxButton.querySelector("i.far") as HTMLElement;

        maximizeWindow(win);

        if (isWindowMaximized(win)) {
            icon.classList.remove("fa-square");
            icon.classList.add("fa-clone");
        } else {
            icon.classList.add("fa-square");
            icon.classList.remove("fa-clone");
        }
    });

    closeButton.addEventListener("click", e => {
        closeWindow(win);
    });

})  

