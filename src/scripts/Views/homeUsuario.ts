import { ipcRenderer } from "electron"
import { remote } from "electron"
import path from "path"

let win = remote.getCurrentWindow()

document.addEventListener("DOMContentLoaded",()=>{
    const bvn = document.querySelector("#hello") as HTMLElement
    const user = JSON.parse(sessionStorage.getItem("user") as string) as any
    bvn.innerHTML = `Olá ${user.nome}`
    const btnFindByCPF  = document.querySelector("#findByCPF")  as HTMLButtonElement
    const inpCPF  = document.querySelector("#cpfCliente")  as HTMLInputElement
    
    btnFindByCPF.addEventListener("click", () => {
        ipcRenderer.send("getCliente",{id_usuario:user.id,cpf:inpCPF.value})
    })

    ipcRenderer.on("sendCliente", async (event,arg:string) => {
        let cliente = arg
        sessionStorage.setItem("cliente",cliente)
        await win.loadFile(path.resolve(__dirname,"../../pages/cliente/fullBody.html"))
    })
})  

