import { ipcRenderer } from "electron"
import { remote } from "electron"
import path from "path"

let win = remote.getCurrentWindow()
let webContent = remote.getCurrentWebContents()
const usuario = JSON.parse(sessionStorage.getItem("user") as string) as any

function inverter(s:string) {
    return s.split("-").reverse().join('/');
}


function logout ( webContent : Electron.WebContents ):void{
    webContent.goToIndex(0);
    webContent.clearHistory();
}

function backPage ( webContent : Electron.WebContents ):void{
    webContent.goBack();
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


function getCliente(){
        let cpf = ( (event as Event).currentTarget as any ).attributes.cpf.value
        ipcRenderer.send("getCliente",{id_usuario:usuario.id,cpf:cpf})
}

document.addEventListener("DOMContentLoaded",()=>{

    const minimizeButton = document.getElementById("minimize") as HTMLElement;
    const maxUnmaxButton = document.getElementById("maximize") as HTMLElement;
    const closeButton = document.getElementById("close") as HTMLElement;
    const goBackButton = document.getElementById("goback") as HTMLElement;
    const logOutButton = document.getElementById("logout") as HTMLElement;

    ipcRenderer.on("sendCliente", async (event,arg:string) => {
        let cliente = arg
        sessionStorage.setItem("cliente",cliente)
        await win.loadFile(path.resolve(__dirname,"../../pages/cliente/cliente.html"))
    })

    var cont = 0;
    usuario.clientes.forEach(( elemento : any) => {
        if(cont % 5 == 0 && cont != 0){
            ( document.getElementById("tabela") as HTMLElement ).innerHTML += "<tr>";
        }
        ( document.getElementById("tabela") as HTMLElement ).innerHTML += "<td>" + elemento.nome + "</td>" 
            + "<td>" + elemento.biotipo + "</td>" 
            + "<td>" + elemento.genero + "</td>" 
            + "<td>" + elemento.cpf + "</td>" 
            + "<td>" + inverter(new Date(elemento.data_nascimento).toISOString().split("T")[0]) + "</td>" 
            + `<td> <button onclick="getCliente()" cpf="${elemento.cpf}" class='findCliente'><i class="fas fa-arrow-right"></i></button></td>`;
            
        if(cont % 5 == 0 && cont != 0){
            ( document.getElementById("tabela") as HTMLElement ).innerHTML += "<tr>";
        }
        cont += 1;
    });

    logOutButton.addEventListener("click", e =>  {
        logout(webContent);
    })

    goBackButton.addEventListener("click" , e => {
        backPage(webContent);
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

