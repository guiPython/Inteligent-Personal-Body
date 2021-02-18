import { app , BrowserWindow } from "electron"
import path from "path"
import { usuarioController } from "./src/scripts/Controllers/usuario"
import { clienteController } from "./src/scripts/Controllers/cliente"


var window : BrowserWindow

async function createWindow(){

    window = new BrowserWindow({
        width: 1400,
        height: 900,
        show: false,
        frame:false,
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule:true,
        }
    })

    window.once('ready-to-show', () => {
        window.show()
    })

    usuarioController()
    clienteController()
    await window.loadFile(path.resolve(__dirname,"./src/pages/formlogin/login.html"))

    window.webContents.openDevTools()
}

app.whenReady().then(createWindow)

export { window }