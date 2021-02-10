import { ipcRenderer } from "electron"
import { Usuario } from "../Models/usuario"
import { remote } from "electron"
import path from "path"

let win = remote.getCurrentWindow()

document.addEventListener("DOMContentLoaded",()=>{
    const loginButton = document.getElementById("login") as HTMLInputElement
    const cadButton   = document.getElementById("cadastro") as HTMLInputElement
    const emailInput  = { login: document.querySelector("#email") as HTMLInputElement , cadastro: document.querySelector("#emailcad") as HTMLInputElement}
    const senhaInput  = { login: document.querySelector("#pass") as HTMLInputElement , cadastro: document.querySelector("#passcad") as HTMLInputElement}
    const nomeInput   = { cadastro: document.querySelector("#usercad") as HTMLInputElement }


    loginButton.addEventListener("click",()=>{
        let usuario : Usuario = {email:emailInput.login.value,senha:senhaInput.login.value}
        console.log(usuario)
        ipcRenderer.send("Login",usuario)
    })

    ipcRenderer.on("sendUsuario",async (event, arg:Usuario|Error)=>{
        console.log(arg)
        if ( arg ){
            await win.loadFile(path.resolve(__dirname,"../../pages/body/fullBody.html"))
        }
        else{
            alert("Usuario e/ou Senhas incorretos")
        }
    })  
})  

