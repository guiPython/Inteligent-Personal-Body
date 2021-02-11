import { UsuarioModel } from "../noSQL/scripts/Models/usuario"
const usuario = new UsuarioModel("guilherme","teste@teste.com.br","teste123")
const nUsuario = new UsuarioModel()


describe( "\nTESTE : Classe Modelo Usuario " , () => {

    test(" function insertUsuario" , async  () => {
        await expect( usuario.createUsuario() ).resolves.toBe(true)
        await expect( usuario.createUsuario() ).rejects.toThrowError(/^ERROR: User can`t be insert in DataBase$/)
    })

    test(" function getUsuario" , async () => {
        await expect( usuario.readUsuario() ).resolves.toMatchObject({
            nome:   usuario.nome,
            senha:  usuario.senha,
            email:  usuario.email
        })
        await expect ( nUsuario.readUsuario() ).rejects.toThrowError(/^ERROR: User not found in DataBase$/)
    })

    /*test(" function deleteUsuario", async () => {
        await expect ( usuario.deleteUsuario() ).resolves.toBe(true)
        await expect ( nUsuario.deleteUsuario() ).rejects.toThrowError(/^ERROR: User not found$/)
    })*/

})

