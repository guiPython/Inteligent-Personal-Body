import lowdb from "lowdb"
import FileSync from "lowdb/adapters/FileSync"
import path from "path"

import { Usuario } from "../scripts/Models/usuario"
import { Cliente } from "../scripts/Models/cliente"

interface DataBase {
    users:Array<Usuario>
    clients:Array<Cliente>
}

var db = lowdb( new FileSync<DataBase>(path.resolve(__dirname,"./DataBase.json")) )
db.defaults({ users:[] , clients:[] }).write()


export { db }