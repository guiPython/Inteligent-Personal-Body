import { remote , ipcRenderer } from "electron"
import { AtrUsuario } from "../Models/usuario"
import path from "path"
const win = remote.getCurrentWindow()

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


document.addEventListener("DOMContentLoaded",()=>{
    
    const minimizeButton = document.getElementById("minimize") as HTMLElement;
    const maxUnmaxButton = document.getElementById("maximize") as HTMLElement;
    const closeButton = document.getElementById("close") as HTMLElement;
    const btnTroca = document.querySelector("#trocaSenha") as HTMLButtonElement
    const inpEmail = document.querySelector("#email") as HTMLInputElement
    const inpSenha = document.querySelector("#senha") as HTMLInputElement

    btnTroca.addEventListener("click",()=>{
        const usuario : AtrUsuario = {email:inpEmail.value,senha:inpSenha.value}
        ipcRenderer.send("EsqueciSenha",usuario)
    })

    ipcRenderer.on("trocouSenha", async (event,arg:boolean) => {
        if(arg){
            await win.loadFile(path.resolve(__dirname,"../../pages/formLogin/formLogin.html"))
        }
        alert("O usuario não existe")
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
