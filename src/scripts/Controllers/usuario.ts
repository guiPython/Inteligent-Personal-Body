import { UsuarioModel , Usuario } from "../Models/usuario" 
import { ipcMain } from "electron"
import { window } from"../../../main"

const usuarioController = () => {
        ipcMain.on("Login", async (event , arg:Usuario )=>{
                let usuario   = new UsuarioModel(arg.nome,arg.email,arg.senha)
                let status
                try{
                        await usuario.readUsuario()
                        status = true
                }
                catch(e){
                        status = false
                }
                
                window.webContents.send("sendUsuario",status)
        })

}

export { usuarioController }
