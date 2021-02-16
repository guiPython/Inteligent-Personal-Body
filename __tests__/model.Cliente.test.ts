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
                    id:2,
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