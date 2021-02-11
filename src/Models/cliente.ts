import { DataTypes, Model , Optional} from "sequelize"
import { connection } from "../DataBase/DataBase";
import { Usuario } from "./usuario"
import { Medida } from "./medida"

interface AtrCliente {
    id:number,
    nome:string,
    cpf:string,
    data_nascimento:Date,
    biotipo:string,
    genero:string,
    email:string,
    status:boolean
}

interface CreateAtrCliente extends Optional<AtrCliente,"id">{}

class Cliente extends Model<AtrCliente,CreateAtrCliente> implements AtrCliente{

    public id !: number;
    public nome !: string;
    public cpf !: string;
    public data_nascimento !: Date;
    public biotipo !: string;
    public genero !: string;
    public email !: string;
    public status !: boolean;

    public readonly createAt!: Date;
    public readonly updateAt!: Date
}

Cliente.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        nome:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        cpf:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        data_nascimento:{
            type:DataTypes.DATE,
            allowNull:false
        },
        biotipo:{ 
            type:DataTypes.STRING,
            allowNull:false,
        },
        genero:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        status:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        }
    },
    {
        sequelize:connection,
        tableName:"Clientes"
    }
)

//Cliente.belongsTo(Usuario,{targetKey:"id"})
//Cliente.hasMany(Medida,{sourceKey:"id"})

export{Cliente}