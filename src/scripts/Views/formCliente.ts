import { ipcRenderer , remote } from "electron"
import path from "path"
import { AtrCliente } from "../Models/cliente"
import { AtrUsuario } from "../Models/usuario"

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

var usuario = JSON.parse(sessionStorage.getItem('user') as string)

document.addEventListener("DOMContentLoaded",()=>{
    const minimizeButton = document.getElementById("minimize") as HTMLElement;
    const maxUnmaxButton = document.getElementById("maximize") as HTMLElement;
    const closeButton = document.getElementById("close") as HTMLElement;
    const cadastroButton = (document.getElementById("cadastro") as HTMLElement);

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

    cadastroButton.addEventListener("click",()=>{

        const inpNome = (document.getElementById("nome")  as HTMLInputElement).value as string;
        const inpSobreNome = (document.getElementById("sobrenome") as HTMLInputElement).value as string;
        const inpDataNascimento = (document.getElementById("dataNascimento") as HTMLInputElement).value as string;
        const [ dia, mes , ano ] = inpDataNascimento.split("/")
        const [ diaV, mesV, anoV ] = [Number(dia),Number(mes),Number(ano)]
        const inpNomeCompleto = inpNome +" "+ inpSobreNome
        const inpEmail = (document.getElementById("email") as HTMLInputElement).value as string;
        const inpCpf = (document.getElementById("cpf") as HTMLInputElement).value as string;
        const inpGenero = (document.getElementById("listaSexos") as HTMLSelectElement);
        const inptGeneroValue = inpGenero.options[inpGenero.selectedIndex].text as string;
        const inpBiotipo =  ( document.getElementById("listaBiotipos") as HTMLSelectElement);
        const inpBiotipoValue = inpBiotipo.options[inpBiotipo.selectedIndex].text as string

        const cliente : AtrCliente = {
            id_usuario:usuario.id,
            nome:inpNomeCompleto,
            email:inpEmail,
            cpf:inpCpf,
            biotipo:inpBiotipoValue,
            status:true,
            data_nascimento:new Date(anoV,mesV-1,diaV),
            genero:inptGeneroValue
        }
        ipcRenderer.send("createCliente",cliente)
    })

    ipcRenderer.on("sendStatusCadastroCliente",async(event, args)=>{
        if (args){
            let cliente = args
            sessionStorage.setItem('cliente',cliente)
            await win.loadFile(path.resolve(__dirname,"../../pages/cliente/cliente.html"))
        }
        else{
            alert("O cliente ja existe")
        }
    })

})