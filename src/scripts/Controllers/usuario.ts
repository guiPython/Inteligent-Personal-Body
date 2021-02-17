import { Usuario , AtrUsuario } from "../Models/Usuario"
import { Sequelize } from "sequelize"
import { ipcMain } from "electron"
import { window } from"../../../main"

const usuarioController = () => {

        ipcMain.on("Login", async (event , arg:AtrUsuario )=>{
                let status
                try{ status = JSON.stringify((await Usuario.findOne({where: Sequelize.and({ email:arg.email, senha:arg.senha }),include:["clientes"]}) as any).dataValues) }
                catch(e){ status = false }
                window.webContents.send("sendStatusLogin",status == null ? false : status)
        })

        ipcMain.on("Cadastro", async (event , arg:AtrUsuario ) => {
                let status
                try{ await Usuario.create(arg) ;  status = true }
                catch(e){ status = false }
                window.webContents.send("sendStatusCadastro",status)
        })

        ipcMain.on("EsqueciSenha", async (event, arg:AtrUsuario) => {
                let status
                try{ status = await Usuario.update({senha:arg.senha},{where:{email:arg.email}})}
                catch(e){ status = 0 }
                window.webContents.send("trocouSenha",status == 0 ? false : true)
        })
}

export { usuarioController }
