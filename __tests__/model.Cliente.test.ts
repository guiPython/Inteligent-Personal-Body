import { Cliente , AtrCliente } from "../src/scripts/Models/cliente"

const cliente : AtrCliente = {   
    id_usuario:2,
    nome:"Cesar Bassi",
    cpf:"xxx.xxx.xxx-xx",
    data_nascimento:new Date(2001,11,15),
    biotipo:"Ectomorfo",
    genero:"Masculino",
    email:"cesar.gmail.com.br",
    status:true,
    
}

const cliente2 : AtrCliente = {   
    id_usuario:2,
    nome:"DiegoLina 13",
    cpf:"xxx.yyy.uuu-xx",
    data_nascimento:new Date(2001,11,15),
    biotipo:"Mesomorfo",
    genero:"Masculino",
    email:"diegoVisk.gmail.com.br",
    status:true,
    
}

const cliente3 : AtrCliente = {   
    id_usuario:2,
    nome:"Mamaco Loko",
    cpf:"ooo.xxx.ooo-xx",
    data_nascimento:new Date(2002,10,25),
    biotipo:"Endomorfo",
    genero:"Masculino",
    email:"mamacoLoko.gmail.com.br",
    status:true,
    
}

describe("\n TESTE: Métodos do Banco Tabela Clientes", () => {
    
    test(" function Create Table Clientes", async () => {
        expect( await Cliente.sync({force:true}).then(() => { return true } )).toBe(true)
    })

    test(" function Create " , async () => {
        expect( await Cliente.create(cliente) ).toMatchObject(
            {
                    id:1,
                    id_usuario:cliente.id_usuario,
                    nome:cliente.nome,
                    cpf:cliente.cpf,
                    data_nascimento:cliente.data_nascimento,
                    biotipo:cliente.biotipo,
                    genero:cliente.genero,
                    email:cliente.email,
                    status:cliente.status
                }
        )
        expect( await Cliente.create(cliente2) ).toMatchObject(
            {
                    id:2,
                    id_usuario:cliente2.id_usuario,
                    nome:cliente2.nome,
                    cpf:cliente2.cpf,
                    data_nascimento:cliente2.data_nascimento,
                    biotipo:cliente2.biotipo,
                    genero:cliente2.genero,
                    email:cliente2.email,
                    status:cliente2.status
                }
        )
        expect( await Cliente.create(cliente3) ).toMatchObject(
            {
                    id:3,
                    id_usuario:cliente3.id_usuario,
                    nome:cliente3.nome,
                    cpf:cliente3.cpf,
                    data_nascimento:cliente3.data_nascimento,
                    biotipo:cliente3.biotipo,
                    genero:cliente3.genero,
                    email:cliente3.email,
                    status:cliente3.status
                }
        )
    })

    test(" function Update ", async () => {
        expect( await Cliente.update({nome:"Jorge Maluco"},{where:{cpf:cliente.cpf}})).toEqual(
            expect.arrayContaining([1])
        )
    })

    test(" function Delete ", async () => {
        expect ( await Cliente.destroy({where:{cpf:cliente.cpf}})).toBe(1)
    })

    test(" function Create Again" , async () => {
        expect( await Cliente.create(cliente) ).toMatchObject(
            {
                    id:4,
                    id_usuario:cliente.id_usuario,
                    nome:cliente.nome,
                    cpf:cliente.cpf,
                    data_nascimento:cliente.data_nascimento,
                    biotipo:cliente.biotipo,
                    genero:cliente.genero,
                    email:cliente.email,
                    status:cliente.status
                }
        )
    })
})