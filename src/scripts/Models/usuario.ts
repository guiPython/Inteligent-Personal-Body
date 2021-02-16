import { Association, Model , Optional , DataTypes } from "sequelize"
import { Cliente } from "./cliente"
import connection from "../../DataBase/DataBase"

interface AtrUsuario{
    id?: number,
    nome?:string,
    senha:string,
    email:string
}

interface CreateAtrUsuario extends Optional<AtrUsuario,"id">{}

class Usuario extends Model<AtrUsuario,CreateAtrUsuario> implements AtrUsuario{
    public id!: number;
    public nome!: string;
    public senha!: string;
    public email!: string;

    public readonly createAt!: Date;
    public readonly updateAt!: Date;

    public static clientes?: Cliente[]

    public static associations : {
        clientes: Association<Usuario,Cliente>
    }

}

Usuario.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        nome:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        senha:{
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING(60),
            unique: true,
            allowNull: false,
        }
    },
    {
        sequelize:connection,
        tableName:"Usuarios"
    }
)

Usuario.hasMany(Cliente,{sourceKey:"id",foreignKey:"id_usuario",as:"clientes"})

export { Usuario , AtrUsuario }