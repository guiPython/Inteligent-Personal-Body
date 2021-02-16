import { Usuario } from "../src/scripts/Models/usuario"
import { Cliente } from "../src/scripts/Models/cliente"
import { Medida } from "../src/scripts/Models/medida"
import { DbrCutanea } from "../src/scripts/Models/dbrCutaneas"
import { CircMusculo } from "../src/scripts/Models/circMusculos"
import { Sequelize } from "sequelize"



describe("\n TESTE: Métodos do Banco Relacionamentos", () => {

    test(" function read Cliente", async () => {
        expect( await Cliente.findOne({where: Sequelize.and({nome:"Cesar Bassi",cpf:"xxx.xxx.xxx-xx"}),include:["medidas","dobras","circunferencias"]}) ).toMatchObject(
            {
                id: 2,
                id_usuario: 2,
                nome: 'Cesar Bassi',
                cpf: 'xxx.xxx.xxx-xx',
                biotipo: 'Ectomorfo',
                genero: 'Masculino',
                email: 'cesar.gmail.com.br',
                status: true,
                medidas: [
                    {
                        "altura": 1.86,
                        "id": 2,
                        "id_cliente": 2,
                        "peso": 87.63,
                    }
                ],
                dobras: [
                    {
                        "dbrcAbdominal": 14.5,
                        "dbrcPeitoral": 10.5,
                        "dbrcTricipitalD": 8.4,
                        "dbrcTricipitalE": 7.6,
                    }
                ],
                circunferencias: [
                    {
                        "circAbdomen": 5.6,
                        "circBracoD": 15.6,
                        "circBracoE": 89.6,
                        "circCintura": 58.5,
                        "circCoxaD": 87.9,
                        "circCoxaE": 88.9,
                        "circGluteo": 54.7,
                        "circPernaD": 78.9,
                        "circPernaE": 77.8,
                        "circTorax": 45.6,
                    }
                ]
            }
        )
    })

    test(" function read Usuario " , async () => {
        expect( await Usuario.findOne({
            where: Sequelize.and({email:"teste@teste.com.br",senha:"teste1234"}),include:["clientes"]}) ).toMatchObject(
            {
                id:2,
                nome:"Guilherme Rocha Muzi Franco",
                senha:"teste1234",
                email:"teste@teste.com.br",
                clientes:[
                    {
                        "biotipo": "Ectomorfo",
                        "cpf": "xxx.xxx.xxx-xx",
                        "email": "cesar.gmail.com.br",
                        "genero": "Masculino",
                    }
                ]
            }
        )
    })

})