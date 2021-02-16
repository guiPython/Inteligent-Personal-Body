import { Usuario , AtrUsuario } from "../Models/Usuario"
import { Sequelize } from "sequelize"
import { ipcMain } from "electron"
import { window } from"../../../main"

const usuarioController = () => {

        ipcMain.on("Login", async (event , arg:AtrUsuario )=>{
                let status
                try{ status = await Usuario.findOne({where: Sequelize.and({ email:arg.email, senha:arg.senha })}) }
                catch(e){ status = false }
                window.webContents.send("sendStatusLogin",status == null ? false : status)
        })

        ipcMain.on("Cadastro", async (event , arg:AtrUsuario ) => {
                let status
                try{ await Usuario.create(arg) ;  status = true }
                catch(e){ status = false }
                console.log(status)
                window.webContents.send("sendStatusCadastro",status)
        })
}

export { usuarioController }
