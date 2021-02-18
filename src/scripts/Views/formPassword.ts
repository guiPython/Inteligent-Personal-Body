import { remote , ipcRenderer } from "electron"
import { AtrUsuario } from "../Models/usuario"
import path from "path"
const win = remote.getCurrentWindow()

document.addEventListener("DOMContentLoaded",()=>{
    
    const btnTroca = document.querySelector("#trocaSenha") as HTMLButtonElement
    const inpEmail = document.querySelector("#email") as HTMLInputElement
    const inpSenha = document.querySelector("#senha") as HTMLInputElement

    btnTroca.addEventListener("click",()=>{
        const usuario : AtrUsuario = {email:inpEmail.value,senha:inpSenha.value}
        ipcRenderer.send("EsqueciSenha",usuario)
    })

    ipcRenderer.on("trocouSenha", async (event,arg:boolean) => {
        if(arg){
            await win.loadFile(path.resolve(__dirname,"../../pages/login/login.html"))
        }
        alert("O usuario não existe")
    })
})
