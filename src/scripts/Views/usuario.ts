import { ipcRenderer } from "electron"
import { remote } from "electron"
import path from "path"

let win = remote.getCurrentWindow()
const usuario = JSON.parse(sessionStorage.getItem("user") as string) as any

function getCliente(){
        let cpf = ( event?.target as any ).attributes.cpf.value
        ipcRenderer.send("getCliente",{id_usuario:usuario.id,cpf:cpf})
}

document.addEventListener("DOMContentLoaded",()=>{
    const bvn = document.querySelector("#hello") as HTMLElement
    bvn.innerHTML = `Olá ${usuario.nome}`
    const btnFindByCPF  = document.querySelector("#findByCPF")  as HTMLButtonElement
    const inpCPF  = document.querySelector("#cpfCliente")  as HTMLInputElement
    
    btnFindByCPF.addEventListener("click", () => {
        ipcRenderer.send("getCliente",{id_usuario:usuario.id,cpf:inpCPF.value})
    })

    ipcRenderer.on("sendCliente", async (event,arg:string) => {
        let cliente = arg
        sessionStorage.setItem("cliente",cliente)
        await win.loadFile(path.resolve(__dirname,"../../pages/cliente/cliente.html"))
    })

})  

