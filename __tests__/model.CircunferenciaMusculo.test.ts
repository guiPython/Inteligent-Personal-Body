import { CircMusculo ,  AtrCircMusculo } from "../src/scripts/Models/circMusculos"

const circMusculo : AtrCircMusculo = {
    id_cliente:2,
    circAbdomen:5.6,
    circBracoD:15.6,
    circBracoE:89.6,
    circCintura:58.5,
    circCoxaD:87.9,
    circCoxaE:88.9,
    circGluteo:54.7,
    circPernaD:78.9,
    circPernaE:77.8,
    circTorax:45.6,
}

describe("\n TESTE: Métodos do Banco Circunferencias Musculos", () => {

    test(" function Create Table Circunferencias Musculos", async () => {
        expect( await CircMusculo.sync({force:true}).then(() => { return true } )).toBe(true)
    })

    test(" function Create " , async () => {
        expect( await CircMusculo.create(circMusculo) ).toMatchObject(
            {
                id:1,
                id_cliente:2,
                circAbdomen:5.6,
                circBracoD:15.6,
                circBracoE:89.6,
                circCintura:58.5,
                circCoxaD:87.9,
                circCoxaE:88.9,
                circGluteo:54.7,
                circPernaD:78.9,
                circPernaE:77.8,
                circTorax:45.6,
            }
        )
    })

    test(" function Update ", async () => {
        expect( await CircMusculo.update({circAbdomen:7.85},{where:{id_cliente:circMusculo.id_cliente}})).toEqual(
            expect.arrayContaining([1])
        )
    })

    test(" function Delete ", async () => {
        expect ( await CircMusculo.destroy({where:{id_cliente:circMusculo.id_cliente}})).toBe(1)
    })

    test(" function Create Again" , async () => {
        expect( await CircMusculo.create(circMusculo) ).toMatchObject(
            {
                id:2,
                id_cliente:2,
                circAbdomen:5.6,
                circBracoD:15.6,
                circBracoE:89.6,
                circCintura:58.5,
                circCoxaD:87.9,
                circCoxaE:88.9,
                circGluteo:54.7,
                circPernaD:78.9,
                circPernaE:77.8,
                circTorax:45.6,
            }
        )
    })
})