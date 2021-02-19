import { Cliente , AtrCliente } from "../Models/cliente"
import { ipcMain } from "electron"
import { window } from "../../../main"
import { Sequelize, where } from "sequelize"

const clienteController = async () => {

    ipcMain.on("updateCliente",(event, arg:AtrCliente ) => {

    })

    ipcMain.on("createCliente",async (event, arg:AtrCliente ) => {
        let status
        try{ await Cliente.create(arg) ; status = JSON.stringify(await Cliente.findOne({where:{cpf:arg.cpf},include:["dobras","circunferencias","medidas"]})) }
        catch(e) { status = false }
        window.webContents.send("sendStatusCadastroCliente",status)
    })

    ipcMain.on("getCliente", async (event, arg:{id_usuario:number,cpf:string}) => {
            let status
            try{ status = JSON.stringify(await Cliente.findOne({where:Sequelize.and(
                {
                    id_usuario:arg.id_usuario,
                    cpf:arg.cpf
                }
            ),include:["medidas","circunferencias","dobras"]})) }
            catch{ status = false }
            window.webContents.send("sendCliente",status)
    })

}

export { clienteController }