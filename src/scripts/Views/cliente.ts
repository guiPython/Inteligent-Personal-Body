import { ipcRenderer } from "electron"
import { remote } from "electron"
import { Json } from "sequelize/types/lib/utils"

let win = remote.getCurrentWindow()

document.addEventListener("DOMContentLoaded",()=>{
    const bvn = document.querySelector("#hello") as HTMLElement
    const cliente = JSON.parse(sessionStorage.getItem("cliente") as string) as any
    bvn.innerHTML = `Olá ${cliente.nome}`

})  

