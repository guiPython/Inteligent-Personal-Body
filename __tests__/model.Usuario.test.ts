import { Usuario , AtrUsuario} from "../src/scripts/Models/usuario"

const usuario : AtrUsuario = {
    nome:"Guilherme Rocha Muzi Franco",
    senha:"teste1234",
    email:"teste@teste.com.br"
}

describe("\n TESTE: Métodos do Banco Tabela Usuarios", () => {

    test(" function Create Table Usuarios", async () => {
        expect( await Usuario.sync({force:true}).then(() => { return true } )).toBe(true)
    })

    test(" function Create " , async () => {
        expect( await Usuario.create(usuario) ).toMatchObject(
            {
                    id:1,
                    nome:usuario.nome,
                    senha:usuario.senha,
                    email:usuario.email
                }
        )
    })

    test(" function Update ", async () => {
        expect( await Usuario.update({nome:"Jorge Maluco"},{where:{email:usuario.email}})).toEqual(
            expect.arrayContaining([1])
        )
    })

    test(" function Delete ", async () => {
        expect ( await Usuario.destroy({where:{email:usuario.email}})).toBe(1)
    })

    test(" function Create Again" , async () => {
        expect( await Usuario.create(usuario) ).toMatchObject(
            {
                id:2,
                nome:usuario.nome,
                senha:usuario.senha,
                email:usuario.email
            }
        )
    })
})