import { Cliente , AtrCliente } from "../Models/cliente"
import { ipcMain } from "electron"
import { window } from "../../../main"

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

}