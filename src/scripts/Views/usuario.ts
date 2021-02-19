import { ipcRenderer } from "electron"
import { remote } from "electron"
import path from "path"

let win = remote.getCurrentWindow()
var usuario = JSON.parse(sessionStorage.getItem("user") as string) as any

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
    ipcRenderer.send("window-all-closed")
}

function isWindowMaximized( browserWindow : Electron.BrowserWindow ):boolean{
    return browserWindow.isMaximized()
}


function getCliente(){
        let cpf = ( event?.target as any ).attributes.cpf.value
        ipcRenderer.send("getCliente",{id_usuario:usuario.id,cpf:cpf})
}

document.addEventListener("DOMContentLoaded",()=>{
    const minimizeButton = document.getElementById("minimize") as HTMLElement;
    const maxUnmaxButton = document.getElementById("maximize") as HTMLElement;
    const closeButton = document.getElementById("close") as HTMLElement;

    ipcRenderer.on("sendCliente", async (event,arg:string) => {
        let cliente = arg
        sessionStorage.setItem("cliente",cliente)
        await win.loadFile(path.resolve(__dirname,"../../pages/cliente/cliente.html"))
        win.maximize()
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

