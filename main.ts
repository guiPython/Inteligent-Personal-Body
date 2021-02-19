import { app , BrowserWindow } from "electron"
import path from "path"
import { usuarioController } from "./src/scripts/Controllers/usuario"
import { clienteController } from "./src/scripts/Controllers/cliente"


var window : BrowserWindow

async function createWindow(){

    window = new BrowserWindow({
        width: 1700,
        height: 900,
        maxWidth:1700,
        maxHeight:900,
        show: false,
        frame:false,
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule:true,
            contextIsolation:false
        }
    })

    window.once('ready-to-show', () => {
        window.show()
    })

    usuarioController()
    clienteController()
    await window.loadFile(path.resolve(__dirname,"./src/pages/formlogin/formLogin.html"))

}

app.whenReady().then(createWindow)

app.on("activate" , async () => {
    if ( BrowserWindow.getAllWindows().length === 0 ){
        await createWindow()
    }
})

app.on("window-all-closed",()=>{
    app.quit()
    if ( process.platform === "darwin") { app.quit() }
})


export { window }