import { ipcRenderer } from "electron"
import { AtrUsuario , Usuario } from "../Models/usuario"
import { remote } from "electron"
import path from "path"

let win = remote.getCurrentWindow()

document.addEventListener("DOMContentLoaded",()=>{
    const loginButton = document.getElementById("login") as HTMLInputElement
    const cadastroButton   = document.getElementById("cadastro") as HTMLInputElement
    const emailInput  = { login: document.querySelector("#email") as HTMLInputElement , cadastro: document.querySelector("#emailCAD") as HTMLInputElement}
    const senhaInput  = { login: document.querySelector("#pass") as HTMLInputElement , cadastro: document.querySelector("#passCAD") as HTMLInputElement}
    const nomeInput   = { cadastro: document.querySelector("#userCAD") as HTMLInputElement }

    loginButton.addEventListener("click",()=>{
        let usuario : AtrUsuario = { email:emailInput.login.value , senha:senhaInput.login.value }
        ipcRenderer.send("Login",usuario)
    })

    cadastroButton.addEventListener("click",()=>{
        let usuario : AtrUsuario = { nome:nomeInput.cadastro.value , email:emailInput.cadastro.value , senha:senhaInput.cadastro.value }
        ipcRenderer.send("Cadastro",usuario)
    })

    ipcRenderer.on("sendStatusLogin",async (event, arg:boolean|Usuario)=>{
        if ( arg ){
            let usuario = arg as any
            let user = JSON.stringify(usuario.dataValues)
            sessionStorage.setItem("user",user);
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
})  

