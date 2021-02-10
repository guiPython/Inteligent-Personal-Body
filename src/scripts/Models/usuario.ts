import { db } from "../../dataBase/index"


interface Usuario {
    id?:number,
    nome?:string,
    email?:string,
    senha?:string
}


class UsuarioModel {
    
    nome?:string
    email?:string
    senha?:string

    constructor(nome?:string,email?:string,senha?:string){
        this.nome = nome
        this.email = email
        this.senha = senha
    }

    private validateAttributes():boolean{
        if ( undefined == this.nome && undefined == this.senha && undefined == this.email ) {
            return false
        }
        return true
    }

    private validateConstrains(usuario:Usuario,usuarios:any):boolean{
        let status
        status = usuarios.findIndex({email:usuario.email}).value() == -1 ? true : false
        return status
    }

    async readUsuario(): Promise<Usuario|Error> {
        try{
            const usuario = db.get("users").find({email:this.email,senha:this.senha}).value() as Usuario
            if ( usuario === undefined ){ throw Error }
            return usuario
        }
        catch{
            throw new Error("ERROR: User not found in DataBase")
        }
    }

    async createUsuario(): Promise<Error|boolean> {
        try{
            if ( this.validateAttributes() ) {
                const usuarios = db.get("users")
                const id = usuarios.size().value() + 1
                const usuario : Usuario = {id:id,nome:this.nome,email:this.email,senha:this.senha}
                if ( this.validateConstrains(usuario,usuarios) ){ await db.get("users").push(usuario).write() }
                else{ throw Error }
                return true
            }
            else { throw Error }
        }
        catch{
            throw new Error("ERROR: User can`t be insert in DataBase")
        }
    }

    async deleteUsuario(): Promise<Error|boolean> {
        try{
            if ( this.validateAttributes() ) {
                await db.get("users").remove({email:this.email,senha:this.senha}).write()
                return true
            }
            else { throw Error }
        }
        catch{
            throw new Error("ERROR: User not found")
        }

    }
}

export { UsuarioModel , Usuario }