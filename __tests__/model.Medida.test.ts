import { Medida , AtrMedida } from "../src/scripts/Models/medida"

const medida : AtrMedida = {
    id_cliente:4,
    altura:1.86,
    peso:87.63,
}

describe("\n TESTE: Métodos do Banco Tabela Usuarios", () => {

    test(" function Create Table Usuarios", async () => {
        expect( await Medida.sync({force:true}).then(() => { return true } )).toBe(true)
    })

    test(" function Create " , async () => {
        expect( await Medida.create(medida) ).toMatchObject(
            {
                    id:1,
                    id_cliente:4,
                    altura:1.86,
                    peso:87.63,
            }
        )
    })

    test(" function Update ", async () => {
        expect( await Medida.update({altura:1.85},{where:{id_cliente:medida.id_cliente}})).toEqual(
            expect.arrayContaining([1])
        )
    })

    test(" function Delete ", async () => {
        expect ( await Medida.destroy({where:{id_cliente:medida.id_cliente}})).toBe(1)
    })

    test(" function Create Again" , async () => {
        expect( await Medida.create(medida) ).toMatchObject(
            {
                    id:2,
                    id_cliente:4,
                    altura:1.86,
                    peso:87.63,
            }
        )
    })
})