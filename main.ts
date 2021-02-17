import { app , BrowserWindow } from "electron"
import path from "path"
import { usuarioController } from "./src/scripts/Controllers/usuario"
import { clienteController } from "./src/scripts/Controllers/cliente"


var window : BrowserWindow

async function createWindow(){

    window = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule:true,
        }
    })

    usuarioController()
    clienteController()
    await window.loadFile(path.resolve(__dirname,"./src/pages/login/login.html"))

    window.webContents.openDevTools()
}

app.whenReady().then(createWindow)

export { window }