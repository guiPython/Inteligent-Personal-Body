import { ipcRenderer } from "electron"
import { remote } from "electron"
import path from "path"

let win = remote.getCurrentWindow()
const usuario = JSON.parse(sessionStorage.getItem("user") as string) as any

function minimizeWindow( browserWindow : Electron.BrowserWindow ):void{
    if ( browserWindow.minimizable ){
        browserWindow.minimize()
    }
}

function maximizeWindow( browserWindow : Electron.BrowserWindow ):void{
    if ( browserWindow.maximizable ){
        //browserWindow.maximize()
        //browserWindow.setSize()
    }
}

function closeWindow( browserWindow : Electron.BrowserWindow ):void{
    browserWindow.close()
}

function isWindowMaximized( browserWindow : Electron.BrowserWindow ):boolean{
    return browserWindow.isMaximized()
}


function getCliente(){
        let cpf = ( event?.target as any ).attributes.cpf.value
        ipcRenderer.send("getCliente",{id_usuario:usuario.id,cpf:cpf})
}

document.addEventListener("DOMContentLoaded",()=>{
    const bvn = document.querySelector("#hello") as HTMLElement
    bvn.innerHTML = `Olá ${usuario.nome}`
    const btnFindByCPF  = document.querySelector("#findByCPF")  as HTMLButtonElement
    const inpCPF  = document.querySelector("#cpfCliente")  as HTMLInputElement
    const minimizeButton = document.getElementById("minimize") as HTMLElement;
    const maxUnmaxButton = document.getElementById("maximize") as HTMLElement;
    const closeButton = document.getElementById("close") as HTMLElement;
    
    btnFindByCPF.addEventListener("click", () => {
        ipcRenderer.send("getCliente",{id_usuario:usuario.id,cpf:inpCPF.value})
    })

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

