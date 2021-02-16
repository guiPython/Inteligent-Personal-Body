import { app , BrowserWindow } from "electron"
import path from "path"
import { usuarioController } from "./src/scripts/Controllers/usuario"
import { clienteController } from "./src/scripts/Controllers/cliente"


var window : BrowserWindow

async function createWindow(){

    window = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule:true,
        }
    })

    usuarioController()
    clienteController()
    await window.loadFile(path.resolve(__dirname,"./src/pages/index/index.html"))

    window.webContents.openDevTools()
}

app.whenReady().then(createWindow)

export { window }