import { ClienteModel } from "../src/scripts/Models/cliente"

const cliente = new ClienteModel(
    "Guilherme Rocha Muzi Franco",
    "Ectomorfo",
    "teste@teste04",
    "masculino",
    "xxx.xxx.xxx-xx",
    "02/10/2001",
    "ativo",
    {["20/10/2021"]:{
            peso:45,
            altura:1.56,
            metabolismoBasal:1560,
            caloriaDieta:2569
        }
    }
)


describe( "\nTESTE : Classe Modelo cliente " , () => {

    test(" function insertCliente" , async  () => {
        await expect( cliente.createCliente() ).resolves.toBe(true)
        await expect( cliente.createCliente() ).rejects.toThrowError(/^ERROR: Client can`t be insert in DataBase$/)
    })

    test(" function getCliente" , async () => {
        await expect( cliente.readCliente(cliente.cpf,cliente.email) ).resolves.toMatchObject({
            id:1,
            sexo: cliente.sexo,
            nome: cliente.nome,
            cpf:   cliente.cpf,
            email:  cliente.email,
            biotipo: cliente.biotipo,
            data_Nascimento: cliente.dNascimento,
            status: cliente.status,
            info:cliente.info
        })
    })

    test(" function deleteCliente", async () => {
        await expect ( cliente.deleteCliente() ).resolves.toBe(true)
        await expect ( cliente.deleteCliente() ).rejects.toThrowError(/^ERROR: Client isn`t deleted$/)
    })

})

