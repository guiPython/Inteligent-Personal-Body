import { ipcRenderer , remote } from "electron"
import path from "path"
import { AtrCliente } from "../Models/cliente"

const win = remote.getCurrentWindow()

function inverter(s:string) {
    return s.split("-").reverse().join('/');
}

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
    const cliente = sessionStorage.getItem("cliente") as any
    const inpNome = (document.getElementById("nome")  as HTMLInputElement);
    const inpSobreNome = (document.getElementById("sobrenome") as HTMLInputElement);
    const inpDataNascimento = (document.getElementById("dataNascimento") as HTMLInputElement);
    const inpEmail = (document.getElementById("email") as HTMLInputElement);
    const inpCpf = (document.getElementById("cpf") as HTMLInputElement);
    const inpBiotipo =  ( document.getElementById("listaBiotipos") as HTMLSelectElement);
    const inpGenero = (document.getElementById("listaSexos") as HTMLSelectElement);
    if ( cliente != null ){
        inpNome.innerHTML = cliente.nome.split(" ")[0]
        inpSobreNome.innerHTML = cliente.nome.split(" ")[1]
        inpDataNascimento.innerHTML = inverter(new Date(cliente.data_nascimento).toISOString().split("T")[0])
        inpEmail.innerHTML = cliente.email
        inpCpf.innerHTML = cliente.cpf
        inpBiotipo.innerHTML = cliente.biotipo
        inpGenero.innerHTML = cliente.genero
    }

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

        const Nome = inpNome.value as string;
        const SobreNome = inpSobreNome.value as string;
        const DataNascimento = inpDataNascimento.value as string;
        const [ dia, mes , ano ] = DataNascimento.split("/")
        const [ diaV, mesV, anoV ] = [Number(dia),Number(mes),Number(ano)]
        const NomeCompleto = Nome +" "+ SobreNome
        const Email = inpEmail.value as string;
        const Cpf = inpCpf.value as string;
        const GeneroValue = inpGenero.options[inpGenero.selectedIndex].text as string;
        const BiotipoValue = inpBiotipo.options[inpBiotipo.selectedIndex].text as string

        const cliente : AtrCliente = {
            id_usuario:usuario.id,
            nome:NomeCompleto,
            email:Email,
            cpf:Cpf,
            biotipo:BiotipoValue,
            status:true,
            data_nascimento:new Date(anoV,mesV-1,diaV),
            genero:GeneroValue
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