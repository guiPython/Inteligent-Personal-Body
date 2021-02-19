import { DbrCutanea , AtrDbrCutanea } from "../src/scripts/Models/dbrCutaneas"

const dbrCutanea : AtrDbrCutanea = {
    id_cliente:4,
    dbrcAbdominal:14.5,
    dbrcPeitoral:10.5,
    dbrcTricipitalD:8.4,
    dbrcTricipitalE:7.6,
} 

describe("\n TESTE: Métodos do Banco Tabela Dobras Cutaneas", () => {

    test(" function Create Table Usuarios", async () => {
        expect( await DbrCutanea.sync({force:true}).then(() => { return true } )).toBe(true)
    })

    test(" function Create " , async () => {
        expect( await DbrCutanea.create(dbrCutanea) ).toMatchObject(
            {
                id:1,
                id_cliente:4,
                dbrcAbdominal:14.5,
                dbrcPeitoral:10.5,
                dbrcTricipitalD:8.4,
                dbrcTricipitalE:7.6,
            }
        )
    })

    test(" function Update ", async () => {
        expect( await DbrCutanea.update({dbrcAbdominal:1.85},{where:{id_cliente:dbrCutanea.id_cliente}})).toEqual(
            expect.arrayContaining([1])
        )
    })

    test(" function Delete ", async () => {
        expect ( await DbrCutanea.destroy({where:{id_cliente:dbrCutanea.id_cliente}})).toBe(1)
    })

    test(" function Create Again" , async () => {
        expect( await DbrCutanea.create(dbrCutanea) ).toMatchObject(
            {
                id:2,
                id_cliente:4,
                dbrcAbdominal:14.5,
                dbrcPeitoral:10.5,
                dbrcTricipitalD:8.4,
                dbrcTricipitalE:7.6,
            }
        )
    })
})