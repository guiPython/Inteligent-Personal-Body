import { ipcRenderer , remote} from "electron"
import { AtrUsuario } from "../Models/usuario"
import path from "path"

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

document.addEventListener("DOMContentLoaded",()=>{

    const loginButton = document.getElementById("login") as HTMLInputElement
    const cadastroButton   = document.getElementById("cadastro") as HTMLInputElement
    const emailInput  = { login: document.querySelector("#email") as HTMLInputElement , cadastro: document.querySelector("#emailCAD") as HTMLInputElement}
    const senhaInput  = { login: document.querySelector("#pass") as HTMLInputElement , cadastro: document.querySelector("#passCAD") as HTMLInputElement}
    const nomeInput   = { cadastro: document.querySelector("#userCAD") as HTMLInputElement }
    const minimizeButton = document.getElementById("minimize") as HTMLElement;
    const maxUnmaxButton = document.getElementById("maximize") as HTMLElement;
    const closeButton = document.getElementById("close") as HTMLElement;

    loginButton.addEventListener("click",()=>{
        let usuario : AtrUsuario = { email:emailInput.login.value , senha:senhaInput.login.value }
        ipcRenderer.send("Login",usuario)
    })

    cadastroButton.addEventListener("click",()=>{
        let usuario : AtrUsuario = { nome:nomeInput.cadastro.value , email:emailInput.cadastro.value , senha:senhaInput.cadastro.value }
        ipcRenderer.send("Cadastro",usuario)
    })

    ipcRenderer.on("sendStatusLogin",async (event, arg:boolean|string)=>{
        if ( arg ){
            let usuario = arg as string
            sessionStorage.setItem("user",usuario);
            await win.loadFile(path.resolve(__dirname,"../../pages/usuario/usuario.html"))
        }
        else{
            alert("Usuario e/ou Senhas incorretos")
        }
    })

    ipcRenderer.on("sendStatusCadastro",async (event, arg:AtrUsuario) => {
        if ( arg ){
            alert("Cadastro Efetuado com Sucesso")
            emailInput.cadastro.value = ""
            senhaInput.cadastro.value = ""
            nomeInput.cadastro.value  = ""
            let inpLogin = document.querySelector("#tab-1") as HTMLInputElement
            inpLogin.checked = true
        }
        else{
            alert("Cadastro não efetuado")
        }
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

