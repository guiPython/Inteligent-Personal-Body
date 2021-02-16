import { Cliente , AtrCliente } from "../Models/cliente"
import { ipcMain } from "electron"
import { window } from "../../../main"
import { Sequelize } from "sequelize"

const clienteController = async () => {
    
    ipcMain.on("readCliente",(event, arg:AtrCliente ) => {
        let status
        try{
            status = true
        }
        catch{
            status = false
        }
        window.webContents.send("sendStatusCliente",status)
    })

    ipcMain.on("updateCliente",(event, arg:AtrCliente ) => {

    })

    ipcMain.on("createCliente",(event, arg:AtrCliente ) => {

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