import { db } from "../../dataBase/index"

interface Cliente{
    id?:number;
    nome?: string;
    biotipo?: string;
    email?:string;
    cpf?: string;
    sexo?:string;
    data_Nascimento?: string;
    status?: string;
    info?: Info;
}


interface Info {
    [ data : string ] : {
        peso:number,
        altura:number,
        metabolismoBasal:number,
        caloriaDieta:number,
        
        [ "Superiores" ] ?: {
            "Dobras Cutaneas":{
                "Tricipital Esquerda":number,
                "Tricipital Direita":number,
                "Peitoral":number,
                "Abdominal":number,
            },
            "Circunferencias":{
                "Braco Esquerdo":number,
                "Braco Direito":number,
                "Torax":number,
                "Abdomen":number,
                "Cintura":number,
            }
        },
        [ "Inferiores" ] ?: {
            "Circunferencias":{
                "Gluteo":number,
                "Coxa Esquerda":number,
                "Coxa Direita":number,
                "Perna Esquerda":number,
                "Perna Direita":number
            }
        }
    }
}

class ClienteModel{ 
    nome: string|undefined;
    biotipo: string|undefined;
    email:string|undefined;
    cpf: string|undefined;
    sexo:string|undefined;
    dNascimento: string|undefined;
    status: string|undefined;
    info: Info|undefined;
    attributes: Array<string|undefined|Info>

    constructor(nome?:string,biotipo?:string,email?:string,sexo?:string,cpf?:string,dNascimento?:string,status?:string,info?:Info){
        this.nome = nome;
        this.biotipo = biotipo;
        this.email = email;
        this.sexo = sexo;
        this.cpf  = cpf;
        this.dNascimento = dNascimento;
        this.status = status
        this.info = info
        this.attributes = [nome,biotipo,email,sexo,cpf,dNascimento,status,info]
    }

    validadeAttributes():boolean{
        if ( typeof undefined in this.attributes ){
            return false
        }
        return true
    }

    validateConstrains(cliente:Cliente,clientes:any):boolean{
        
        if ( clientes.findIndex({email:cliente.email}).value( ) ==-1 && clientes.findIndex({cpf:cliente.cpf}).value() == -1){
            return true
        }
        return false
    }

    async createCliente(){
        try{
            if ( this.validadeAttributes() ){
                const clientes = db.get("clients")
                const id = clientes.size().value() + 1
                const cliente : Cliente = {
                    id:id,
                    nome:this.nome,
                    email:this.email,
                    biotipo:this.biotipo,
                    sexo:this.sexo,
                    cpf:this.cpf,
                    data_Nascimento:this.dNascimento,
                    status:this.status,
                    info:this.info
                }
                if ( this.validateConstrains(cliente,clientes)){ await clientes.push(cliente).write() }
                else { throw Error }
            }
            else{
                throw Error
            }
            return true
        }
        catch{
            throw new Error("ERROR: Client can`t be insert in DataBase")
        }
        
    }

    async readCliente(cpf?:string,email?:string){
        try{
            let query =  email != undefined ? {email:email} : cpf != undefined ? {cpf:cpf}: undefined
            if ( query == undefined ){ throw Error }
            else{
                const cliente = db.get("clients").find(query).value()
                return cliente
            }
        }
        catch{
            throw new Error("ERROR: Client isn`t defined in DataBase")
        }
    }

    async deleteCliente(){
        try{
            let clientes = db.get("clients")
            if (clientes.findIndex({email:this.email,cpf:this.cpf}).value() != -1 ){
                await clientes.remove({email:this.email,cpf:this.cpf}).write()
                return true
            }
            else{ throw Error }
        }
        catch{
            throw new Error("ERROR: Client isn`t deleted")
        }
    }


}

export { ClienteModel , Cliente }