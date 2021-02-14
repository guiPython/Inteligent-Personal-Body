import { Usuario } from "../Models/Usuario" 
import { ipcMain } from "electron"
import { window } from"../../../main"

const usuarioController = () => {
        ipcMain.on("Login", async (event , arg:Usuario )=>{
                let status
                try{
                        status = true
                }
                catch(e){
                        status = false
                }
                
                window.webContents.send("sendStatus",status)
        })

}

export { usuarioController }
